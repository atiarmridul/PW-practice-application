# Playwright Automation Standards

This repository follows scalable Playwright automation engineering practices.

---

# Core Principles

- Tests must be isolated
- Avoid flaky execution
- Keep locators stable
- Prefer reusable helpers
- Maintain readable test flow

---

# Locator Standards

Preferred order:

1. getByRole
2. getByLabel
3. getByTestId
4. stable css selectors

Avoid unstable xpath selectors whenever possible.

---

# Test Structure

Recommended order:

1. Test setup
2. Test data
3. User actions
4. Assertions
5. Cleanup

---

# Assertion Practices

- Assertions should validate behavior
- Avoid unnecessary assertions
- Keep assertion messages meaningful
- Verify visible outcomes

---

# Wait Strategy

- Use Playwright auto-waiting
- Avoid hardcoded timeouts
- Prefer waitForResponse or waitForURL when needed

Bad Example:

```ts
await page.waitForTimeout(5000)
```

Preferred:

```ts
await expect(element).toBeVisible()
```

---

# Maintainability Standards

- Reuse page objects
- Centralize selectors
- Avoid duplicated logic
- Keep utility functions modular

---

# CI/CD Practices

- Keep tests deterministic
- Ensure parallel execution safety
- Generate readable reports
- Support GitHub Actions execution

---

# Engineering Philosophy

This project emphasizes:

- Reliable automation
- Maintainable framework design
- QA engineering principles
- Scalable architecture
- Readable test structure
