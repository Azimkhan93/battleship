import { WinnerDbType } from "./types";

class WinnerDb {
    private winners: WinnerDbType[] = []

    getWinner(userName: string): WinnerDbType | undefined {
        return this.winners.find((winner) => winner.name === userName);
    }

    getWinnerList()  {
        return this.winners;
    }

    addWinner(newUser: WinnerDbType) {
        this.winners = [...this.winners, newUser]
    }

    updateWinner(userName: string) {
        this.winners = this.winners.map((winner) => {
            if(winner.name === userName) {
                return {
                    ...winner,
                    wins: winner.wins + 1
                }
            }

            return winner;
        })
    }
}

export const winnerDb = new WinnerDb()