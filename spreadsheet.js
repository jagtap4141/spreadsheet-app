import { useState } from 'react';

const Spreadsheet = () => {
  const [grid, setGrid] = useState(initializeGrid(20, 10)); // 20 rows, 10 columns
  const [computedGrid, setComputedGrid] = useState(initializeGrid(20, 10));

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = value;
    setGrid(newGrid);
    computeFormulas(newGrid);
  };

  const computeFormulas = (newGrid) => {
    const newComputedGrid = newGrid.map((row) =>
      row.map((cell) => {
        if (cell.startsWith('=')) {
          try {
            return evaluateFormula(cell.substring(1), newGrid);
          } catch (error) {
            return 'ERROR';
          }
        }
        return cell;
      })
    );
    setComputedGrid(newComputedGrid);
  };

  const evaluateFormula = (formula, grid) => {
    const parsedFormula = formula.replace(/[A-Z]\d+/g, (match) => {
      const { row, col } = parseCellRef(match);
      return grid[row][col] || 0;
    });
    return eval(parsedFormula); // Use a safer alternative in production
  };

  const parseCellRef = (ref) => {
    const col = ref.charCodeAt(0) - 65;
    const row = parseInt(ref.substring(1)) - 1;
    return { row, col };
  };

  const renderColumnHeader = () => {
    return (
      <tr>
        <th className="w-12 bg-gray-700 text-white p-2"></th>
        {Array.from({ length: grid[0].length }).map((_, colIndex) => (
          <th
            key={colIndex}
            className="bg-gray-700 text-white p-2 text-center"
          >
            {String.fromCharCode(65 + colIndex)}
          </th>
        ))}
      </tr>
    );
  };

  return (
    <div className="overflow-auto w-full max-w-full p-4 bg-gray-900 rounded-lg shadow-lg">
      <table className="table-fixed w-full bg-gray-800 border-separate border-spacing-0 text-white">
        <thead>{renderColumnHeader()}</thead>
        <tbody>
          {computedGrid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Row header */}
              <th className="w-12 bg-gray-700 text-white p-2 text-center">
                {rowIndex + 1}
              </th>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border border-gray-600 p-2">
                  <input
                    type="text"
                    value={grid[rowIndex][colIndex]}
                    onChange={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                    className="w-full h-full p-2 text-sm border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  <span className="text-gray-400 text-xs">{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to initialize the grid
const initializeGrid = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(''));
};

export default Spreadsheet;
