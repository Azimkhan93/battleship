import {winnerDb} from "../../../db/winner.db";
import {jsonStringifier} from "../../utils/jsonHandler";
import {EVENT_TYPES} from "../../../constants/event-type.constant";

export const updateWinnersCommand = () => {
    return jsonStringifier(EVENT_TYPES.UPDATE_WINNERS, winnerDb.getWinnerList());
};
