import ms from 'ms';
import { Inject, Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { PatreonManagementService } from '@/core/integrations/PatreonManagementService.js';

export const meta = {
	requireCredential: true,
	limit: {
		duration: ms('1hour'),
		max: 12,
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {},
	required: [],
} as const;

// eslint-disable-next-line import/no-default-export
@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> {
	constructor(
		private patreonManagementService: PatreonManagementService,
	) {
		super(meta, paramDef, async (ps, me) => {
			this.patreonManagementService.requestUpdateCache();
		});
	}
}