import os
import unittest


def fun(x):
    return x + 1

class GameOfLife:
    set liveCells = []

    def __init__(self, liveCells):
        self.liveCells = liveCells
    

#Any live cell with <2 live neighbours dies
#Any live cell with 2-3 live neighbours lives
#Any live cell with >3 live neighbours dies
#Any dead cell with 3 live neighbours becomes a live cell

class TestGOL(unittest.TestCase):
    def testLiveCellWithUnder2LiveNeighborsDies(self):
        game = GameOfLife(set([ (0,0), (0,1), (0,-1) ]))
        game.nextState();
        self.assertFalse(game.isAlive((0,1)))

    def testLiveCellWith2Or3LiveNeighborsLives(self):
        self.assertTrue(True)

    def testLiveCellWithOver3LiveNeighborsDies(self):
        self.assertTrue(True)

    def testDeadCellWith3LiveNeighborsLives(self):
        self.assertTrue(True)
        


def main():
    unittest.main()

    
if __name__ == "__main__":
    main();
