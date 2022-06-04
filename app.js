
let cors = require("cors");
let express = require("express");
let app = express();

let spawn = require("child_process").spawn;
// let board_pos_function = spawn("python", ["board.py"])
let arr = [];

let saved_res = null;

// board_pos_function.stdout.on("data", (result) => {
    // arr = result
    //         .toString()
    //         .replace(/\r\n/, "")
    //         .split(",")
    //         .map((n) => parseInt(n.replace(/[^0-9]/g, "")));

arr = [
    133,  232, 845,
    941, 1096, 232,
    1805,  941
];

console.log(arr);

app.use(cors());

app.get("/:data", (req, res) => {
    let data = req.params.data.split(" ");
    let [team, before_pos, after_pos] = [data[0], data[1], data[2]];

    if(saved_res == null) {
        saved_res = res;
        let board_arr = [arr[arr.length - 4], arr[arr.length - 3], arr[arr.length - 2], arr[arr.length - 1]];

        spawn("python", ["click.py", board_arr.toString(), before_pos, after_pos, team]);
    
    } else {
        let board_arr = [arr[0], arr[1], arr[2], arr[3]];

        saved_res.send(data);
        saved_res = null;

        spawn("python", ["click.py", board_arr.toString(), before_pos, after_pos, team]);
    }
});

app.listen(80, () => {
    console.log("server run");
});
// });
