import type { DemoPipelineAllowlist } from './types';

/**
 * Pages and demos that render through docs-infra instead of the legacy pipeline.
 *
 * Keys are page locations as emitted by the Markdown loader, and demo keys are
 * marker values as written in Markdown. Both are matched exactly so the server
 * and the client always select the same pipeline.
 *
 * Keep this list empty on `master` until a capability is verified for a demo.
 */
export const demoPipelineAllowlist: DemoPipelineAllowlist = {};
