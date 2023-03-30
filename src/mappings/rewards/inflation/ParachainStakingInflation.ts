import {Inflation, StakedInfo} from "./Inflation";
import Big from "big.js";
import {BigFromINumber, PerbillToNumber} from "../../utils";

export class ParachainStakingInflation implements Inflation {

    async from(stakedInfo: StakedInfo): Promise<number> {
        let inflationConfig = (await api.query.parachainStaking.inflationConfig()).toJSON() as { expect: {min, max, ideal}, annual: {min, max, ideal} }

        if (stakedInfo.totalStaked < Big(Number(inflationConfig.expect.min))) {
            return PerbillToNumber(inflationConfig.annual.min)
        } else if (stakedInfo.totalStaked > Big(Number(inflationConfig.expect.max))) {
            return PerbillToNumber(inflationConfig.annual.max)
        } else {
            return PerbillToNumber(inflationConfig.annual.ideal)
        }
    }
}