import React from 'react'

function calculateScore({answers, ques}) {
    let score = 0;
    for(let i = 0; i < 15; i++) {
        if(answers[i] === ques[i].correct_answer) {
            score++;
        }
    }
    return score;
}

export default calculateScore