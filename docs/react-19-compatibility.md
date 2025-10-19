# React 19 Compatibility Audit

The project depends on React 19.1.0, so every third-party package with a React peer dependency was reviewed to guarantee it officially supports React 19. Packages that did not already advertise compatibility were replaced with internal components.

| Package | Installed version | React peer dependency | Action |
| --- | --- | --- | --- |
| `@radix-ui/react-accordion` (represents other Radix primitives) | 1.2.11 | `^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc` | No change required |
| `@tanstack/react-query` | ^5.83.0 | `^18 || ^19` | No change required |
| `cmdk` | 1.1.1 | `^18 || ^19 || ^19.0.0-rc` | No change required |
| `embla-carousel-react` | ^8.6.0 | `^16.8.0 || ^17.0.1 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc` | No change required |
| `input-otp` | 1.4.2 | `^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc` | No change required |
| `lucide-react` | 0.462.0 | `^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0-rc` | No change required |
| `react-hook-form` | ^7.61.1 | `^16.8.0 || ^17 || ^18 || ^19` | No change required |
| `react-resizable-panels` | ^2.1.9 | `^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc` | No change required |
| `recharts` | ^2.15.4 | `^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0` | No change required |
| `sonner` | ^1.7.4 | `^18.0.0 || ^19.0.0 || ^19.0.0-rc` | No change required |
| `react-day-picker` | Removed | `^16.8.0 || ^17.0.0 || ^18.0.0` | Replaced with an internal calendar component |
| `vaul` | Removed | `^16.8 || ^17.0 || ^18.0` | Replaced with a Radix-powered drawer implementation |

This checklist should be revisited whenever dependencies are upgraded to ensure the React 19 guarantee remains valid.
