function displayScoreOnLeaderboard(){
    let scores = JSON.parse(localStorage.getItem("savedScores"));
    scores.sort(function(a,b) { return b.score - a.score;} );

    for(let i=0; i< scores.length; i++){
        let li = document.createElement("li");

        li.textContent = scores[i].player + " - " + scores[i].score;
        let orderedList =  document.getElementById("leaderboard-list");
        orderedList.appendChild(li);
     
    }
};

function clearLeaderboard() {
    localStorage.removeItem("savedScores");
    document.location.reload();
    console.log("clicking!")
}

displayScoreOnLeaderboard();

let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearLeaderboard);