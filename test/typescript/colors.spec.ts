import {
    amber, blue, blueGrey,
    brown, cyan, deepOrange,
    deepPurple, green, grey,
    indigo, lightBlue, lightGreen,
    lime, orange, pink,
    purple, red, teal,
    yellow, common
} from '../../src/colors';

[
    // Check if the color is usable as a variable
    amber, blue, blueGrey,
    brown, cyan, deepOrange,
    deepPurple, green, grey,
    indigo, lightBlue, lightGreen,
    lime, orange, pink,
    purple, red, teal,
    yellow
].forEach(color => {
    // Check if each color is a string
    color[50] as string;
    color[100] as string;
    color[200] as string;
    color[300] as string;
    color[400] as string;
    color[500] as string;
    color[600] as string;
    color[700] as string;
    color[800] as string;
    color[900] as string;
    color.A100 as string;
    color.A200 as string;
    color.A400 as string;
    color.A700 as string;
});

const {
    black, white, transparent,
    fullBlack, darkBlack, lightBlack,
    minBlack, faintBlack,
    fullWhite, darkWhite, lightWhite
} = common;

[
    black, white, transparent,
    fullBlack, darkBlack, lightBlack,
    minBlack, faintBlack,
    fullWhite, darkWhite, lightWhite
].forEach(color => {
    color as string;
});

