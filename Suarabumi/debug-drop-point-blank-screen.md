[OPEN] Drop point page blank white screen

## Session
- Session ID: `drop-point-blank-screen`
- Started: 2026-06-17
- Scope: Investigate and fix the frontend drop point page rendering a blank white screen.

## Symptoms
- Opening the drop point page results in a blank white screen.

## Hypotheses
1. The route crashes during initial render because required data is `undefined` or a hook throws.
2. A page-specific import or dependency fails to resolve, preventing the component from mounting.
3. A runtime error in the drop point API request path aborts rendering and leaves the page blank.
4. CSS or layout places the page content off-screen or behind a full-screen overlay.
5. Route configuration or lazy-loading fails, so the page chunk never resolves correctly.

## Evidence Log
- Live backend response from `GET http://127.0.0.1:3001/api/drop-points` returned `materials` as JSON arrays, for example `["Plastik","Kertas","Logam","Elektronik"]`.
- Frontend render path in `frontend/src/pages/DropPointPage.jsx` attempted `(dp.materials || '').split(',')`, which throws when `materials` is an array.
- This mismatch explains the blank white screen: React render crashes while building the drop point list cards.

## Root Cause
- Backend and frontend disagreed on the `materials` field shape.
- Backend route `backend/src/routes/dropPoints.ts` returns `materials: string[]`.
- Frontend page expected `materials` to be a comma-separated string and called `.split(',')`.

## Fix
- Added `normalizeMaterials()` in `frontend/src/pages/DropPointPage.jsx` to support both array and string payloads safely.
- Kept runtime instrumentation in the page to capture any remaining browser/runtime errors during verification.

## Verification
- `npm run build` in `frontend/` completed successfully after the fix.
- Live API payload was re-tested against the new normalization logic and produced valid material badge data for multiple drop points.
- Frontend fix commit pushed to remote: `3b6d0f6` on `main`.

## Status
- Backend remote sync verified on `main` at `c53fca0`.
- Frontend remote sync verified on `main` at `3b6d0f6`.
- Debug session remains open until final in-browser confirmation and cleanup.
