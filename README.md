# Pomodoro Timer Application
[Access the App](https://ralucaspt.github.io/pomodoro/)


## Overview

The **Pomodoro Timer** is a web-based application built using Angular. It helps users efficiently manage their time using the Pomodoro technique, which alternates focused work sessions with breaks. The app also tracks daily progress, allowing users to view their learning statistics throughout the week.

### Key Features
- **Customizable Timer Settings**: Adjust session length, break time, and the number of sessions per Pomodoro cycle.
- **Time Tracking**: Records the time spent learning each day.
- **Weekly Statistics**: Displays a summary of daily learning progress in hours and minutes.
- **Responsive Design**: Built with Angular Material and standalone components for modularity and scalability.

---

## Project Structure

### Core Modules
- **`StorageService`**: Handles persistent storage of learning data in `localStorage`.
- **`TimerService`**: Manages the timer logic, including tracking sessions and updating learning statistics.
- **`WeekstatsComponent`**: Displays weekly statistics.
- **`ConfigComponent`**: Allows users to customize timer settings.
- **`TimerComponent`**: The main timer interface where users start, pause, and reset the timer.

---

## Components and Services

### 1. `StorageService`
Responsible for saving and retrieving time tracking data.

#### Key Functions
- **`saveTimerData()`**: Saves time spent for the current day.
- **`loadTimerData()`**: Loads stored data from `localStorage`.
- **`clearTimerData()`**: Clears all stored data.
- **`updateSignal()`**: Updates the reactive signal for weekly data.


# Signals and Components Overview

## 1. Signals
### `timeSpentLearningEachDayThisWeek`
Tracks time spent learning for each day of the week. This signal is used in the `WeekstatsComponent`.

---

## 2. TimerService
Manages timer operations and session handling.

### Key Signals and Variables
- **`sessionNumber`**: Total number of Pomodoro sessions in a cycle.
- **`currentSessionNumber`**: Sessions remaining in the current cycle.
- **`currentTime`**: Reactive signal representing the timer’s current minutes and seconds.
- **`isBreakTime`**: Tracks whether the current phase is a work session or a break.
- **`isRunning`**: Indicates whether the timer is active.

### Functions
- **`startTimer()`**: Starts the timer, alternating between work and break phases.
- **`stopTimer()`**: Stops the timer.
- **`resetTimer()`**: Resets the timer to its initial settings.
- **`updateStats(timeLeft: number)`**: Updates learning statistics every minute during work sessions.
- **`scheduleNextPomodoroPhase()`**: Switches between work and break phases.

---

## 3. WeekstatsComponent
Displays the time spent learning for each day of the week.

### Features
- Data is fetched from the `StorageService`.
- Time is displayed in hours or minutes using the `transform` function.

### Example Output
- **Monday**: `2 h`
- **Tuesday**: `30 min`

---

## 4. ConfigComponent
Allows users to customize timer settings.

### Features
- Input fields for:
  - Session time
  - Break time
  - Session count
- Validation to ensure inputs are positive integers.
- Updates settings in the `TimerService` when valid inputs are submitted.

---

## 5. TimerComponent
The main interface for controlling the timer.

### Features
- **Start**, **stop**, and **reset** controls.
- Dynamic updates for:
  - The current time
  - Session number
  - Work/break status
- Data fetched from the `TimerService`.

---

## Configuration and Defaults
### Default Settings
Defined in `time.model.ts`:
```typescript
export const DEFAULT_SESSION_TIME = 25; // Minutes
export const DEFAULT_BREAK_TIME = 5;    // Minutes
export const DEFAULT_SESSION_NUMBER = 4; // Number of sessions
```
# How It Works

## Initial Setup
- `StorageService` initializes `localStorage` if no previous data exists.

## Timer Workflow
1. Users start the timer in the `TimerComponent`.
2. `TimerService` updates the timer every second.
3. At the end of a session, the app transitions to a break or the next session.

## Tracking Statistics
- `TimerService` calls `StorageService` to save data every minute during work sessions.
- Weekly data is updated and displayed in the `WeekstatsComponent`.

## Customizing Settings
- Users adjust session/break times in the `ConfigComponent`.
- Updates are applied to the timer immediately.

---

# Development and Testing

## Tools and Libraries
- **Angular**: Core framework.
- **Angular Material**: For UI components like cards and forms.
- **`signal`**: Used for reactive state management.

## Running the App
1. **Install dependencies**:
   ```bash
   npm install
   
3. **Access the app** at [http://localhost:4200](http://localhost:4200).

---

# Future Improvements
- **Add user authentication**: Sync data across devices for a seamless experience.
- **Implement a dark mode**: Improve accessibility and reduce eye strain in low-light environments.
- **Add notifications**: Provide alerts for session and break transitions to enhance user convenience.

