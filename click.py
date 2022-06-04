
from PIL import ImageGrab
import pyautogui as pg
import mouse
import time
import sys

WHITE = (248, 248, 248)
BLACK = (86, 83, 82)

def click(board_pos, before_pos, after_pos, team) :
    width = (board_pos[1][0] - board_pos[0][0]) / 8
    height = (board_pos[1][1] - board_pos[0][1]) / 8
    x1, x2, y1, y2 = None, None, None, None

    if team == "w" :
        x1 = board_pos[1][0] - (before_pos[0] - 1) * width - width / 2
        y1 = board_pos[0][1] + (before_pos[1] - 1) * height + height / 2

        x2 = board_pos[1][0] - (after_pos[0] - 1) * width - width / 2
        y2 = board_pos[0][1] + (after_pos[1] - 1) * height + height / 2 

    elif team == "b" :
        x1 = board_pos[1][0] - (before_pos[0] - 1) * width - width / 2
        y1 = board_pos[0][1] + (before_pos[1] - 1) * height + height / 2 
    
        x2 = board_pos[1][0] - (after_pos[0] - 1) * width - width / 2
        y2 = board_pos[0][1] + (after_pos[1] - 1) * height + height / 2

    pg.moveTo((x1, y1))
    pg.click()

    time.sleep(0.05)

    pg.moveTo((x2, y2))
    pg.click()

if __name__ == "__main__" :
    board_pos = sys.argv[1].split(",")
    board_pos = [[int(board_pos[0]), int(board_pos[1])], [int(board_pos[2]), int(board_pos[3])]]
    before_pos = sys.argv[2].split(",")
    after_pos = sys.argv[3].split(",")

    click(board_pos, [int(before_pos[0]), int(before_pos[1])], [int(after_pos[0]), int(after_pos[1])], sys.argv[4])