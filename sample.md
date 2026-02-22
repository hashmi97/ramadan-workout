Great — updating everything so gym days = Sunday, Tuesday, Thursday
and week starts on Sunday.

Below is the final Markdown dataset you can paste directly into Cursor so it can convert into DB seed logic.

Clean, structured, and consistent.

⸻

Ramadan Workout Plan

Start Date: 2026-02-22
Duration: 4 Weeks
Week Starts: Sunday
Gym Days: Sunday, Tuesday, Thursday

⸻

Weekly Schedule Template

Day	Pre-Iftar	After-Iftar	Extra
Sunday	Fat-Burn Circuit	Gym	—
Monday	Fat-Burn Circuit	—	—
Tuesday	Fat-Burn Circuit	Gym	—
Wednesday	Fat-Burn Circuit	—	—
Thursday	Fat-Burn Circuit	Gym	—
Friday	Fat-Burn Circuit	—	—
Saturday	Walk Only	—	45 min walk


⸻

Warm-Up (All Workout Days)

Exercise	Duration
Side steps (slow)	60 sec
Bodyweight squats	15
Pushups	10
Arm circles + stretch	90 sec


⸻

Week 1

Rounds: 5
Abs Rounds: 3

Exercise	Reps
Side steps	60 sec
Squats	15
Pushups	12
Reverse lunges	12/leg
Mountain climbers	30 sec
Plank	30 sec


⸻

Week 2

Rounds: 6
Abs Rounds: 3-4
Extra: 20 min walk after Iftar

Exercise	Reps
Side steps	60 sec
Squats	18
Pushups	15
Reverse lunges	14/leg
Mountain climbers	35 sec
Plank	40 sec


⸻

Week 3

Rounds: 6
Abs Rounds: 4
Add: 10 squat pulses each round

Exercise	Reps
Side steps	75 sec
Squats	18
Pushups	15
Reverse lunges	14/leg
Mountain climbers	40 sec
Plank	45 sec


⸻

Week 4

Rounds: 5
Abs: Daily
Extra: 30–40 min walk nightly

Exercise	Reps
Side steps	60 sec
Squats	15
Pushups	12
Reverse lunges	12/leg
Mountain climbers	30 sec
Plank	45 sec


⸻

Abs Finisher (All Weeks)

Exercise	Reps
Crunches	20
Leg raises	12
Russian twists	20
Plank	30–45 sec


⸻

Gym Split (Sunday, Tuesday, Thursday)

Day	Workout
Sunday	Chest, Shoulders, Triceps, Abs
Tuesday	Back, Biceps, Abs
Thursday	Legs, Shoulders, Abs

gym_program:
  sunday:
    focus: push
    warmup:
      - treadmill_walk: 5_min
      - arm_circles: 1_min
      - pushups: 12
      - shoulder_stretch: 30_sec
    workout:
      - bench_press: {sets: 3, reps: "8-12"}
      - incline_db_press: {sets: 3, reps: "10-12"}
      - lateral_raises: {sets: 3, reps: 15}
      - shoulder_press: {sets: 3, reps: 10}
      - tricep_pushdown: {sets: 3, reps: "12-15"}
    abs:
      - hanging_knee_raises: {sets: 3, reps: 12}
      - plank: {sets: 3, duration: "40s"}

  tuesday:
    focus: pull
    warmup:
      - row_machine: 5_min
      - band_pull_aparts: 1_min
      - light_lat_pulldown: 12
      - arm_stretch: 30_sec
    workout:
      - lat_pulldown: {sets: 3, reps: "10-12"}
      - seated_row: {sets: 3, reps: 12}
      - face_pull: {sets: 3, reps: 15}
      - dumbbell_curl: {sets: 3, reps: 12}
      - hammer_curl: {sets: 2, reps: 12}
    abs:
      - leg_raises: {sets: 3, reps: 12}
      - plank: {sets: 3, duration: "40s"}

  thursday:
    focus: legs_shoulders
    warmup:
      - walk_or_bike: 5_min
      - bodyweight_squats: 15
      - hip_circles: 1_min
      - light_lunges: "10_each"
    workout:
      - leg_press: {sets: 3, reps: 12}
      - rdl: {sets: 3, reps: 10}
      - lunges: {sets: 2, reps: "12_each"}
      - shoulder_press: {sets: 3, reps: 10}
      - lateral_raises: {sets: 3, reps: 15}
    abs:
      - cable_crunch: {sets: 3, reps: 15}
      - plank: {sets: 3, duration: "45s"}