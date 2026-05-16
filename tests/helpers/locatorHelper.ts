import { type Locator, type Page } from "@playwright/test";

export type LocatorCandidate = {
  tag: string;
  id: string;
  text: string;
  locator: string;
  xpath: string;
};

type PageLocatorOptions = {
  max?: number;
  scopeSelector?: string;
  scopeName?: string;
  waitUntil?: "commit" | "domcontentloaded" | "load" | "networkidle";
};

type DomCandidate = {
  tag: string;
  id: string;
  name: string;
  placeholder: string;
  role: string;
  type: string;
  text: string;
  label: string;
  hasHref: boolean;
};

type LocatorRoot = Page | Locator;

type HealingLocatorCandidate = {
  description: string;
  locator: Locator;
};

export type HealingLocatorOptions = {
  role?: Parameters<Page["getByRole"]>[0];
  name?: string | RegExp;
  label?: string | RegExp;
  placeholder?: string | RegExp;
  text?: string | RegExp;
  testId?: string | RegExp;
  css?: string;
  xpath?: string;
  timeout?: number;
};

function toXPathLiteral(value: string): string {
  if (!value.includes("'")) return `'${value}'`;
  if (!value.includes('"')) return `"${value}"`;
  return `concat('${value.split("'").join(`', "'", '`)}')`;
}

function getImplicitRole(tag: string, type: string, hasHref: boolean): string {
  if (tag === "button") return "button";
  if (tag === "textarea") return "textbox";
  if (tag === "select") return "combobox";
  if (tag === "a" && hasHref) return "link";
  if (tag !== "input") return "";

  const normalizedType = (type || "text").toLowerCase();
  if (
    normalizedType === "text" ||
    normalizedType === "email" ||
    normalizedType === "search" ||
    normalizedType === "tel" ||
    normalizedType === "url" ||
    normalizedType === ""
  )
    return "textbox";
  if (normalizedType === "checkbox") return "checkbox";
  if (normalizedType === "radio") return "radio";
  if (
    normalizedType === "button" ||
    normalizedType === "submit" ||
    normalizedType === "reset"
  )
    return "button";

  return "";
}

function shouldUseGetByText(tag: string, text: string): boolean {
  if (!text) return false;
  if (tag === "input" || tag === "textarea" || tag === "select") return false;
  return true;
}

function buildHealingLocatorCandidates(
  root: LocatorRoot,
  options: HealingLocatorOptions,
): HealingLocatorCandidate[] {
  const candidates: HealingLocatorCandidate[] = [];

  if (options.role && options.name) {
    candidates.push({
      description: `role=${String(options.role)}, name=${String(options.name)}`,
      locator: root.getByRole(options.role, { name: options.name }),
    });
  }

  if (options.label) {
    candidates.push({
      description: `label=${String(options.label)}`,
      locator: root.getByLabel(options.label),
    });
  }

  if (options.placeholder) {
    candidates.push({
      description: `placeholder=${String(options.placeholder)}`,
      locator: root.getByPlaceholder(options.placeholder),
    });
  }

  if (options.text) {
    candidates.push({
      description: `text=${String(options.text)}`,
      locator: root.getByText(options.text),
    });
  }

  if (options.testId) {
    candidates.push({
      description: `testId=${String(options.testId)}`,
      locator: root.getByTestId(options.testId),
    });
  }

  if (options.css) {
    candidates.push({
      description: `css=${options.css}`,
      locator: root.locator(options.css),
    });
  }

  if (options.xpath) {
    candidates.push({
      description: `xpath=${options.xpath}`,
      locator: root.locator(`xpath=${options.xpath}`),
    });
  }

  return candidates;
}

export async function getHealingLocator(
  root: LocatorRoot,
  options: HealingLocatorOptions,
): Promise<Locator> {
  const timeout = options.timeout ?? 1000;
  const candidates = buildHealingLocatorCandidates(root, options);

  for (const candidate of candidates) {
    const locator = candidate.locator.first();
    const isVisible = await locator
      .waitFor({ state: "visible", timeout })
      .then(() => true)
      .catch(() => false);

    if (isVisible) {
      return locator;
    }
  }

  throw new Error(
    `No healing locator matched. Tried: ${candidates
      .map((candidate) => candidate.description)
      .join(", ")}`,
  );
}

export async function collectLocatorCandidates(
  scope: Locator,
  max = 40,
): Promise<LocatorCandidate[]> {
  await scope.waitFor({ state: "visible" });

  const rawCandidates = await scope.evaluate((root) => {
    const elements = Array.from(
      root.querySelectorAll(
        "input, textarea, select, button, a, [role], [data-testid]",
      ),
    );

    const clean = (value: string | null) =>
      (value ?? "").trim().replace(/\s+/g, " ");

    return elements.map((el) => {
      const tag = el.tagName.toLowerCase();
      const id = clean(el.getAttribute("id"));
      const name = clean(el.getAttribute("name"));
      const placeholder = clean(el.getAttribute("placeholder"));
      const role = clean(el.getAttribute("role"));
      const type = clean(el.getAttribute("type"));
      const text = clean(el.textContent);
      const hasHref = !!el.getAttribute("href");

      let label = "";
      if (id) {
        const byFor = root.querySelector(`label[for="${id}"]`);
        if (byFor) label = clean(byFor.textContent);
      }
      if (!label) {
        const parentLabel = el.closest("label");
        if (parentLabel) label = clean(parentLabel.textContent);
      }

      return { tag, id, name, placeholder, role, type, text, label, hasHref };
    });
  });

  const items = rawCandidates as DomCandidate[];
  const roleNameCount = new Map<string, number>();

  for (const item of items) {
    const resolvedRole =
      item.role || getImplicitRole(item.tag, item.type, item.hasHref);
    const roleName = item.label || item.text;
    if (!resolvedRole || !roleName) continue;
    const key = `${resolvedRole}:::${roleName}`;
    roleNameCount.set(key, (roleNameCount.get(key) ?? 0) + 1);
  }

  return items
    .map((item) => {
      const resolvedRole =
        item.role || getImplicitRole(item.tag, item.type, item.hasHref);
      const roleName = item.label || item.text;
      const roleNameKey =
        resolvedRole && roleName ? `${resolvedRole}:::${roleName}` : "";
      const hasDuplicateRoleName =
        !!roleNameKey && (roleNameCount.get(roleNameKey) ?? 0) > 1;

      const locator =
        !hasDuplicateRoleName && resolvedRole && roleName
          ? `page.getByRole(${JSON.stringify(resolvedRole)}, { name: ${JSON.stringify(roleName)} })`
          : !hasDuplicateRoleName && resolvedRole
            ? `page.getByRole(${JSON.stringify(resolvedRole)})`
            : item.id
              ? `page.locator(${JSON.stringify(`#${item.id}`)})`
              : item.label
                ? `page.getByLabel(${JSON.stringify(item.label)})`
                : item.placeholder
                  ? `page.getByPlaceholder(${JSON.stringify(item.placeholder)})`
                  : shouldUseGetByText(item.tag, item.text)
                    ? `page.getByText(${JSON.stringify(item.text)})`
                    : item.name
                      ? `page.locator(${JSON.stringify(`${item.tag}[name="${item.name}"]`)})`
                      : `page.locator(${JSON.stringify(item.tag)})`;

      const xpath = item.id
        ? `//*[@id=${toXPathLiteral(item.id)}]`
        : item.placeholder
          ? `//${item.tag}[@placeholder=${toXPathLiteral(item.placeholder)}]`
          : item.name
            ? `//${item.tag}[@name=${toXPathLiteral(item.name)}]`
            : item.text
              ? `//${item.tag}[normalize-space()=${toXPathLiteral(item.text)}]`
              : `//${item.tag}`;

      return {
        tag: item.tag,
        id: item.id || "-",
        text: item.text || "-",
        locator,
        xpath,
      };
    })
    .slice(0, max);
}

export async function printLocatorCandidates(
  scope: Locator,
  scopeName = "Scoped section",
  max = 40,
): Promise<void> {
  const candidates = await collectLocatorCandidates(scope, max);
  console.log(`\nLocator candidates in: ${scopeName}`);
  console.table(candidates);
}

export async function printLocatorCandidatesForCard(
  page: Page,
  cardHeaderText: string,
  max = 40,
): Promise<void> {
  const card = page
    .locator("nb-card", {
      has: page.locator("nb-card-header", { hasText: cardHeaderText }),
    })
    .first();

  await printLocatorCandidates(card, `Card "${cardHeaderText}"`, max);
}

export async function collectLocatorCandidatesForUrl(
  page: Page,
  url: string,
  options: PageLocatorOptions = {},
): Promise<LocatorCandidate[]> {
  const {
    max = 40,
    scopeSelector = "body",
    waitUntil = "domcontentloaded",
  } = options;
  await page.goto(url, { waitUntil });

  const scope = page.locator(scopeSelector).first();
  return collectLocatorCandidates(scope, max);
}

export async function printLocatorCandidatesForUrl(
  page: Page,
  url: string,
  options: PageLocatorOptions = {},
): Promise<void> {
  const {
    max = 40,
    scopeSelector = "body",
    scopeName,
    waitUntil = "domcontentloaded",
  } = options;
  await page.goto(url, { waitUntil });

  const scope = page.locator(scopeSelector).first();
  const resolvedScopeName = scopeName || `URL "${url}" in "${scopeSelector}"`;
  await printLocatorCandidates(scope, resolvedScopeName, max);
}
