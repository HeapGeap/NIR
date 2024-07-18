'use strict';
function fillLeaderboard() {
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard"));
    leaderboardData.sort((a, b) => b.score - a.score);
    leaderboardData = leaderboardData.slice(0, 10);

    const board = document.getElementById("lboard");
    leaderboardData.forEach((item) => {
        const li = document.createElement("li");
        const name = document.createElement("mark");
        name.innerText = item.name;
        const score = document.createElement("small");
        score.innerText = item.score;
        li.append(name, score);
        board.append(li)

    });

}