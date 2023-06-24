import { useState } from "react";

export default function BingoCard(values) {
    const vals = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', 'FREE', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];

    return (
        <div class='bingo-card'>
            {vals.map(row => {
                <div class='bingo-row'>
                    {
                        row.map(val) => {
                            <div class='bingo-val'>{val}</div>
                        }
                    }
                </div>
            })}
        </div>

    );
}
