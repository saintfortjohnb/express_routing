const express = require('express');

const app = express();

// Calculate the mean (average)
app.get('/mean', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number provided' });
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const mean = sum / numbers.length;

  res.json({ operation: 'mean', value: mean });
});

// Calculate the median (midpoint)
app.get('/median', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number provided' });
  }

  numbers.sort((a, b) => a - b);

  const middleIndex = Math.floor(numbers.length / 2);
  let median;

  if (numbers.length % 2 === 0) {
    median = (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
  } else {
    median = numbers[middleIndex];
  }

  res.json({ operation: 'median', value: median });
});

// Calculate the mode (most frequent)
app.get('/mode', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number provided' });
  }

  const frequencyMap = new Map();

  numbers.forEach((num) => {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  });

  let mode;
  let maxFrequency = 0;

  frequencyMap.forEach((frequency, num) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mode = num;
    }
  });

  res.json({ operation: 'mode', value: mode });
});

// Calculate mean, median, and mode
app.get('/all', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number provided' });
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const mean = sum / numbers.length;

  numbers.sort((a, b) => a - b);

  const middleIndex = Math.floor(numbers.length / 2);
  let median;

  if (numbers.length % 2 === 0) {
    median = (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
  } else {
    median = numbers[middleIndex];
  }

  const frequencyMap = new Map();

  numbers.forEach((num) => {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  });

  let mode;
  let maxFrequency = 0;

  frequencyMap.forEach((frequency, num) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mode = num;
    }
  });

  res.json({
    operation: 'all',
    mean,
    median,
    mode,
  });
});

// Start the server
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

module.exports = app;

