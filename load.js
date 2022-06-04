
// 룩 : r
// 나이트 : n
// 비숍 : b
// 킹 : k
// 퀸 : q
// 폰 : p

// 흑 : b
// 백 : w

let all_object = document.querySelectorAll("div.piece");
let xhr = new XMLHttpRequest();

function set() {
    all_object = document.querySelectorAll("div.piece");

    all_object.forEach((e, i) => {
        class_name = e.className.split(" ");

        for(let j=0; j<class_name.length; j++) {
            if(class_name[j].startsWith("square-")) {
                e.object_pos = class_name[j].replace(/square-/, "").split("");

            } else if(class_name[j] != "piece") {
                e.object_team = e.object_team || class_name[j][0];
                e.object_name = e.object_name || class_name[j][1] + i;
            }
        }
    });
}

function get_moved_object() {
    let moved_object = null;
    let new_all_object = document.querySelectorAll("div.piece");

    new_all_object.forEach((e, i) => {
        class_name = e.className.split(" ");
        let [
            new_object_team, 
            new_object_name, 
            new_object_pos 
        ] = [
            e.object_team,
            e.object_name, 
            class_name[2].replace(/square-/, "").split("")
        ];

        all_object.forEach((e, i) => {
            if(new_object_team == e.object_team
            && new_object_name == e.object_name
            && (new_object_pos[0] != e.object_pos[0]
            || new_object_pos[1] != e.object_pos[1])) {
                moved_object = e;
            }
        });
    });

    return moved_object;
}

function show(team) {
    let board = [];

    for(let i=0; i<8; i++) {
        board.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }

    if(team == "w") {
        all_object.forEach((e, i) => {
            pos = e.object_pos;
            board[pos[1] - 1][pos[0] - 1] = e.object_name;
        });
        
        board.reverse();

    } else if(team == "b") {
        all_object.forEach((e, i) => {
            pos = e.object_pos;
            board[pos[1] - 1][pos[0] - 1] = e.object_name; 
        });

        for(let i=0; i<8; i++) {
            board[i] = board[i].reverse();
        }
    }


    for(let i=0; i<8; i++) {
        console.log(board[i].toString());
    }
    
    console.log("\n");
}

function send(info) {
    xhr.open("GET", "http:/localhost/" + info, true);
    xhr.send(null);
} 

set();

let iter = setInterval(() => {
    let moved_object = get_moved_object();
    let my_team = "b";

    if(moved_object != null) {
        let before_pos = moved_object.object_pos;
        
        set();

        if(moved_object.object_team == my_team) {
            send(my_team + " " + before_pos.toString() + " " + moved_object.object_pos.toString());
        }

        // show("b");
    }
}, 100);
    