/* global process */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const RESULTS_FILE = path.resolve(ROOT_DIR, 'test-results.json');
const ASSIGNMENTS_FILE = path.resolve(ROOT_DIR, 'assignments.json');
const SUMMARY_FILE = path.resolve(ROOT_DIR, 'points-summary.md');

function run() {
  console.log('Calculating points...');
  
  // 1. Inputs
  const componentName = process.env.COMPONENT_NAME || 'Unknown';
  const isFirstPush = process.env.IS_FIRST_PUSH === 'true';
  let commitTimeISO = process.env.COMMIT_TIME;

  // Fallback if not provided in env (e.g. running locally)
  if (!commitTimeISO) {
    try {
      commitTimeISO = execSync('git log -1 --format=%cI').toString().trim();
    } catch {
      commitTimeISO = new Date().toISOString();
    }
  }

  // 2. Parse Test Results
  let testResults = { numTotalTests: 0, numPassedTests: 0, numFailedTests: 0, success: false };
  try {
    if (fs.existsSync(RESULTS_FILE)) {
      const data = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'));
      testResults = {
        numTotalTests: data.numTotalTests || 0,
        numPassedTests: data.numPassedTests || 0,
        numFailedTests: data.numFailedTests || 0,
        success: data.success || false,
      };
    } else {
      console.warn('test-results.json not found, assuming tests failed or did not run.');
    }
  } catch (err) {
    console.error('Error parsing test-results.json:', err.message);
  }

  // 3. Parse Assignments
  let assignedDateStr = null;
  try {
    if (fs.existsSync(ASSIGNMENTS_FILE)) {
      const assignments = JSON.parse(fs.readFileSync(ASSIGNMENTS_FILE, 'utf-8'));
      if (assignments[componentName]) {
        assignedDateStr = assignments[componentName].assignedDate;
      }
    }
  } catch (err) {
    console.error('Error parsing assignments.json:', err.message);
  }

  // 4. Calculate Points
  // Base score: 10 if all tests pass and at least 1 test ran
  let baseScore = 0;
  if (testResults.success && testResults.numTotalTests > 0) {
    baseScore = 10;
  }

  // Bonuses only apply if base score is achieved
  let firstPushBonus = 0;
  if (baseScore === 10 && isFirstPush) {
    firstPushBonus = 5;
  }

  let speedyBonus = 0;
  let deadlineIST = 'N/A';
  let commitTimeISTFormatted = 'N/A';

  if (baseScore === 10 && assignedDateStr) {
    // Determine deadline (assigned date at 23:59:59 IST)
    // IST is UTC+5:30. 23:59:59 IST is 18:29:59 UTC
    const deadlineUTCString = `${assignedDateStr}T18:29:59.000Z`;
    const deadlineTime = new Date(deadlineUTCString).getTime();

    const commitDate = new Date(commitTimeISO);
    const commitTime = commitDate.getTime();

    // Format commit time to IST string for display
    commitTimeISTFormatted = commitDate.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
      hour12: false
    });
    
    const deadlineDate = new Date(deadlineUTCString);
    deadlineIST = deadlineDate.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
      hour12: false
    });

    if (commitTime <= deadlineTime) {
      speedyBonus = 5;
    }
  } else if (commitTimeISO) {
      // Just format for display
      const commitDate = new Date(commitTimeISO);
      commitTimeISTFormatted = commitDate.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium',
        hour12: false
      });
  }

  const totalPoints = baseScore + firstPushBonus + speedyBonus;

  // 5. Output Markdown Table
  const markdown = `## 🏆 Grading Report — ${componentName}

| Criterion | Points | Status |
|:---|:---:|:---:|
| Functional Base (all tests pass) | ${baseScore} / 10 | ${baseScore === 10 ? '✅' : '❌'} |
| First-Push Green Bonus | ${firstPushBonus} / 5 | ${firstPushBonus === 5 ? '✅' : '➖'} |
| Speedy Dev Bonus (before 11:59 PM IST) | ${speedyBonus} / 5 | ${speedyBonus === 5 ? '✅' : '➖'} |
| **Total** | **${totalPoints} / 20** | ${totalPoints === 20 ? '🎉' : '👍'} |

<details>
<summary>📊 Test & Git Details</summary>

- **Tests Run:** ${testResults.numTotalTests}
- **Passed:** ${testResults.numPassedTests}
- **Failed:** ${testResults.numFailedTests}
- **Commit Time (IST):** ${commitTimeISTFormatted}
- **Deadline (IST):** ${deadlineIST}
- **First Push to PR:** ${isFirstPush ? 'Yes' : 'No'}

</details>
`;

  fs.writeFileSync(SUMMARY_FILE, markdown, 'utf-8');
  console.log(`Summary written to ${SUMMARY_FILE}`);
  console.log(`Total Points: ${totalPoints}/20`);
}

run();
