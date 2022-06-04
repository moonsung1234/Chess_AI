
import pyautogui as pg
import mouse
import time

def get_board_pos() :
    board_pos = []

    while True :
        if mouse.is_pressed("left") and len(board_pos) < 8 :
            pos = pg.position()
            
            board_pos.append(pos[0])
            board_pos.append(pos[1])

        if len(board_pos) >= 8 :
            break

        time.sleep(0.05)

    print(board_pos)

if __name__ == "__main__" :
    get_board_pos()