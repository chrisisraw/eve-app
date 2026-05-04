export const WORKOUT_CATALOG: Record<string, string[]> = {
  'Back': [
    'Pull-Ups', 'Lat Pulldown', 'Bent-Over Row', 'Seated Cable Row', 'T-Bar Row',
    'Single-Arm Dumbbell Row', 'Face Pulls', 'Straight-Arm Pulldown', 'Deadlift', 'Hyperextensions'
  ],
  'Chest': [
    'Barbell Bench Press', 'Dumbbell Bench Press', 'Incline Bench Press', 'Decline Bench Press',
    'Chest Fly', 'Cable Crossover', 'Push-Ups', 'Dips', 'Pec Deck Machine', 'Close-Grip Bench Press'
  ],
  'Arms': [
    'Barbell Curl', 'Dumbbell Curl', 'Hammer Curl', 'Preacher Curl', 'Concentration Curl',
    'Tricep Pushdown', 'Skull Crushers', 'Overhead Tricep Extension', 'Dips', 'Diamond Push-Ups'
  ],
  'Shoulders': [
    'Overhead Press', 'Dumbbell Shoulder Press', 'Lateral Raise', 'Front Raise',
    'Rear Delt Fly', 'Arnold Press', 'Upright Row', 'Cable Lateral Raise', 'Face Pull', 'Shrugs'
  ],
  'Legs': [
    'Barbell Squat', 'Leg Press', 'Romanian Deadlift', 'Leg Curl', 'Leg Extension',
    'Lunges', 'Bulgarian Split Squat', 'Calf Raise', 'Hack Squat', 'Goblet Squat'
  ],
  'Core': [
    'Plank', 'Crunches', 'Bicycle Crunches', 'Leg Raises', 'Russian Twists',
    'Ab Rollout', 'Hanging Knee Raises', 'Cable Crunch', 'Side Plank', 'Mountain Climbers'
  ],
  'Cardio': [
    'Treadmill Run', 'Stationary Bike', 'Rowing Machine', 'Elliptical', 'Jump Rope',
    'Stair Climber', 'HIIT Sprints', 'Swimming', 'Cycling', 'Burpees'
  ],
  'Full Body': [
    'Deadlift', 'Clean and Press', 'Kettlebell Swing', 'Burpees', 'Thrusters',
    'Battle Ropes', 'Box Jumps', 'Farmer\'s Walk', 'Turkish Get-Up', 'Man Makers'
  ],
};

export const CARDIO_INTENSITIES = ['Easy', 'Moderate', 'Hard', 'Max Effort'];

export interface SuggestedExercise {
  exercise: string;
  category: string;
  sets: number;
  reps: string;
  note: string;
}

// 7-element arrays: index 0 = Monday … 6 = Sunday. Empty array = rest day.
export const PROFILE_WORKOUT_PLANS: Record<string, SuggestedExercise[][]> = {
  maintenance: [
    // Mon — Upper push/pull
    [
      { exercise: 'Dumbbell Bench Press', category: 'Chest',     sets: 3, reps: '10-12',  note: 'Full range of motion — slow on the way down' },
      { exercise: 'Bent-Over Row',        category: 'Back',      sets: 3, reps: '10-12',  note: 'Squeeze shoulder blades at the top' },
      { exercise: 'Overhead Press',       category: 'Shoulders', sets: 3, reps: '10-12',  note: 'Brace your core throughout' },
      { exercise: 'Plank',                category: 'Core',      sets: 3, reps: '45sec',  note: 'Perfect form — squeeze glutes' },
    ],
    // Tue — Cardio
    [
      { exercise: 'Treadmill Run',    category: 'Cardio', sets: 1, reps: '30min',  note: 'Moderate pace — conversational effort' },
      { exercise: 'Mountain Climbers', category: 'Core', sets: 3, reps: '30sec',  note: 'Drive knees fast, keep hips level' },
    ],
    // Wed — Lower
    [
      { exercise: 'Barbell Squat',      category: 'Legs', sets: 4, reps: '8-10',  note: 'Drive through heels, chest up' },
      { exercise: 'Romanian Deadlift',  category: 'Legs', sets: 3, reps: '10-12', note: 'Hinge at hips, feel the hamstring stretch' },
      { exercise: 'Calf Raise',         category: 'Legs', sets: 3, reps: '15-20', note: 'Full extension at the top' },
    ],
    // Thu — Rest
    [],
    // Fri — Full Body
    [
      { exercise: 'Deadlift',       category: 'Full Body', sets: 3, reps: '5-8',   note: 'King of all lifts — keep bar close' },
      { exercise: 'Push-Ups',       category: 'Chest',     sets: 3, reps: '15-20', note: 'Perfect form over speed' },
      { exercise: 'Russian Twists', category: 'Core',      sets: 3, reps: '20',    note: 'Feet off the floor for extra challenge' },
    ],
    // Sat — Cardio
    [
      { exercise: 'Stationary Bike', category: 'Cardio', sets: 1, reps: '45min', note: 'Steady state, keep heart rate 120-140 bpm' },
    ],
    // Sun — Rest
    [],
  ],

  weightloss: [
    // Mon — HIIT blast
    [
      { exercise: 'HIIT Sprints',      category: 'Cardio',    sets: 8, reps: '30sec on / 30sec off', note: 'Max effort on work intervals!' },
      { exercise: 'Burpees',           category: 'Full Body', sets: 4, reps: '12',                   note: 'Chest to floor each rep' },
      { exercise: 'Mountain Climbers', category: 'Core',      sets: 3, reps: '40sec',               note: 'Keep it fast and tight' },
    ],
    // Tue — Steady cardio
    [
      { exercise: 'Treadmill Run', category: 'Cardio', sets: 1, reps: '45min', note: 'Fat-burning zone (120-140 bpm)' },
      { exercise: 'Leg Raises',    category: 'Core',   sets: 3, reps: '15',    note: 'Lower slowly — control the descent' },
    ],
    // Wed — Full body circuit
    [
      { exercise: 'Goblet Squat',  category: 'Legs',   sets: 4, reps: '12-15', note: 'Keep elbows up, sink deep' },
      { exercise: 'Push-Ups',      category: 'Chest',  sets: 3, reps: '15',    note: 'Explosive on the way up' },
      { exercise: 'Bent-Over Row', category: 'Back',   sets: 3, reps: '12',    note: 'Light weight, focus on the squeeze' },
      { exercise: 'Jump Rope',     category: 'Cardio', sets: 1, reps: '10min', note: 'Keep a steady rhythm' },
    ],
    // Thu — Cardio
    [
      { exercise: 'Rowing Machine', category: 'Cardio', sets: 1, reps: '30min', note: 'Great for back + legs + cardio together' },
      { exercise: 'Plank',          category: 'Core',   sets: 4, reps: '30sec', note: 'Shorter holds, more sets' },
    ],
    // Fri — Full body strength
    [
      { exercise: 'Kettlebell Swing', category: 'Full Body', sets: 5, reps: '15',       note: 'Power from hips — not arms' },
      { exercise: 'Lunges',           category: 'Legs',      sets: 3, reps: '12 each',  note: 'Step forward, keep torso upright' },
      { exercise: 'Bicycle Crunches', category: 'Core',      sets: 3, reps: '20',       note: 'Elbow to opposite knee, full rotation' },
    ],
    // Sat — Long cardio
    [
      { exercise: 'Cycling', category: 'Cardio', sets: 1, reps: '60min', note: 'Long steady ride — burn those calories!' },
    ],
    // Sun — Rest
    [],
  ],

  muscle: [
    // Mon — Push: Chest / Shoulders / Triceps
    [
      { exercise: 'Barbell Bench Press',      category: 'Chest',     sets: 5, reps: '5',     note: '5×5 strength foundation — add weight each week' },
      { exercise: 'Incline Dumbbell Press',   category: 'Chest',     sets: 4, reps: '8-10',  note: 'Upper chest emphasis — full stretch at bottom' },
      { exercise: 'Cable Fly',                category: 'Chest',     sets: 3, reps: '12-15', note: 'Constant tension — really feel the pec squeeze' },
      { exercise: 'Overhead Press',           category: 'Shoulders', sets: 4, reps: '6-8',   note: 'Stand for full core activation — press to lockout' },
      { exercise: 'Lateral Raise',            category: 'Shoulders', sets: 4, reps: '12-15', note: 'Lead with elbows, slight lean forward — 2s up, 2s down' },
      { exercise: 'Tricep Pushdown',          category: 'Arms',      sets: 4, reps: '10-12', note: 'Full lockout every rep — keep elbows glued to sides' },
      { exercise: 'Skull Crushers',           category: 'Arms',      sets: 3, reps: '10-12', note: 'Lower under control, explode up — long-head stretch' },
    ],
    // Tue — Pull: Back / Biceps
    [
      { exercise: 'Weighted Pull-Ups',        category: 'Back', sets: 4, reps: '5-8',   note: 'Add a plate or vest — dead hang every rep' },
      { exercise: 'Barbell Bent-Over Row',    category: 'Back', sets: 4, reps: '6-8',   note: 'Overhand grip — drive elbows back, retract scapula' },
      { exercise: 'Lat Pulldown',             category: 'Back', sets: 3, reps: '10-12', note: 'Wide grip — drive elbows down, not arms' },
      { exercise: 'Seated Cable Row',         category: 'Back', sets: 3, reps: '10-12', note: 'Full stretch forward, hard squeeze at end range' },
      { exercise: 'Face Pulls',               category: 'Shoulders', sets: 3, reps: '15-20', note: 'Rear delt + rotator cuff — pull to forehead, elbows high' },
      { exercise: 'Barbell Curl',             category: 'Arms', sets: 4, reps: '8-10',  note: 'Strict curl — no swinging, chin forward at top' },
      { exercise: 'Hammer Curl',              category: 'Arms', sets: 3, reps: '10-12', note: 'Neutral grip — hits brachialis for arm thickness' },
    ],
    // Wed — Legs: Quad / Glute / Hamstring
    [
      { exercise: 'Barbell Squat',            category: 'Legs', sets: 5, reps: '5',      note: '5×5 king — break parallel, knees tracking toes' },
      { exercise: 'Romanian Deadlift',        category: 'Legs', sets: 4, reps: '8-10',   note: 'Hamstring loaded stretch — feel the pull at the bottom' },
      { exercise: 'Leg Press',                category: 'Legs', sets: 4, reps: '10-15',  note: 'Full depth — butt stays on pad throughout' },
      { exercise: 'Bulgarian Split Squat',    category: 'Legs', sets: 3, reps: '10 each', note: 'Best unilateral builder — rear foot elevated, torso upright' },
      { exercise: 'Leg Curl',                 category: 'Legs', sets: 4, reps: '10-12',  note: 'Plantarflex foot for max hamstring activation' },
      { exercise: 'Leg Extension',            category: 'Legs', sets: 3, reps: '12-15',  note: 'Peak quad contraction — pause 1s at top' },
      { exercise: 'Calf Raise',               category: 'Legs', sets: 5, reps: '15',     note: 'Full ROM — heel below platform, full plantarflexion' },
    ],
    // Thu — Rest / Active Recovery
    [],
    // Fri — Push: Volume Day
    [
      { exercise: 'Dumbbell Bench Press',     category: 'Chest',     sets: 4, reps: '8-10',  note: 'Greater ROM than barbell — stretch at the bottom' },
      { exercise: 'Incline Barbell Press',    category: 'Chest',     sets: 4, reps: '8-10',  note: 'Upper chest builder — 30-45° incline' },
      { exercise: 'Chest Dips',              category: 'Chest',     sets: 3, reps: '10-12', note: 'Lean forward to keep chest emphasis' },
      { exercise: 'Arnold Press',             category: 'Shoulders', sets: 4, reps: '10-12', note: 'Rotate as you press — hits all 3 shoulder heads' },
      { exercise: 'Cable Lateral Raise',      category: 'Shoulders', sets: 3, reps: '15',    note: 'Constant tension on medial delt all the way up' },
      { exercise: 'Overhead Tricep Extension',category: 'Arms',      sets: 4, reps: '10-12', note: 'Long head stretch — elbows stay pointed at ceiling' },
      { exercise: 'Tricep Dips',              category: 'Arms',      sets: 3, reps: '12-15', note: 'Upright torso to keep tension on triceps' },
    ],
    // Sat — Pull: Volume Day
    [
      { exercise: 'Deadlift',                 category: 'Full Body', sets: 4, reps: '5',     note: 'Conventional — brace hard, drive floor away with legs' },
      { exercise: 'T-Bar Row',                category: 'Back',      sets: 4, reps: '8-10',  note: 'Chest supported for strict form — squeeze hard' },
      { exercise: 'Single-Arm Dumbbell Row',  category: 'Back',      sets: 3, reps: '10 each', note: 'Heavy — really pull elbow back and up' },
      { exercise: 'Straight-Arm Pulldown',    category: 'Back',      sets: 3, reps: '12-15', note: 'Full lat stretch + contraction — arms straight' },
      { exercise: 'Rear Delt Fly',            category: 'Shoulders', sets: 3, reps: '15-20', note: 'Light weight — squeeze rear delts hard at top' },
      { exercise: 'Preacher Curl',            category: 'Arms',      sets: 4, reps: '10-12', note: 'Eliminate cheating — peak contraction squeeze' },
      { exercise: 'Cable Curl',               category: 'Arms',      sets: 3, reps: '12-15', note: 'Constant tension — supinate at top for full bicep squeeze' },
    ],
    // Sun — Legs: Posterior Chain Focus
    [
      { exercise: 'Hack Squat',               category: 'Legs', sets: 4, reps: '8-12',    note: 'Low foot placement for quad emphasis — deep as possible' },
      { exercise: 'Romanian Deadlift',        category: 'Legs', sets: 4, reps: '10-12',   note: 'Hamstring focus — slow eccentric, 3s down' },
      { exercise: 'Bulgarian Split Squat',    category: 'Legs', sets: 3, reps: '12 each', note: 'Loaded — dumbbell or barbell, knee stays behind toe' },
      { exercise: 'Leg Press',                category: 'Legs', sets: 3, reps: '15-20',   note: 'High volume finisher — feet high and wide for glutes' },
      { exercise: 'Lying Leg Curl',           category: 'Legs', sets: 4, reps: '10-12',   note: 'Full stretch — plantarflex toes for max contraction' },
      { exercise: 'Glute Bridge',             category: 'Legs', sets: 3, reps: '15-20',   note: 'Barbell or bodyweight — drive hips up hard, 1s pause at top' },
      { exercise: 'Calf Raise',               category: 'Legs', sets: 5, reps: '15-20',   note: 'High volume — calves need it to grow' },
    ],
  ],

  bodybuilder: [
    // Mon — Chest
    [
      { exercise: 'Barbell Bench Press', category: 'Chest', sets: 4, reps: '6-8',   note: 'Powerlifter arch for max pec stretch' },
      { exercise: 'Incline Bench Press', category: 'Chest', sets: 3, reps: '8-10',  note: 'Upper chest development' },
      { exercise: 'Chest Fly',           category: 'Chest', sets: 3, reps: '12-15', note: 'Stretch at the bottom — feel the pec' },
      { exercise: 'Cable Crossover',     category: 'Chest', sets: 3, reps: '12-15', note: 'Bring hands together and squeeze hard' },
      { exercise: 'Dips',                category: 'Chest', sets: 3, reps: '10-12', note: 'Lean forward to emphasize chest' },
    ],
    // Tue — Back
    [
      { exercise: 'Deadlift',               category: 'Full Body', sets: 4, reps: '4-6',   note: 'The ultimate mass builder' },
      { exercise: 'Pull-Ups',               category: 'Back',      sets: 4, reps: '6-10',  note: 'Wide grip for lat width' },
      { exercise: 'Bent-Over Row',          category: 'Back',      sets: 4, reps: '6-8',   note: 'Thickness builder — overhand grip' },
      { exercise: 'T-Bar Row',              category: 'Back',      sets: 3, reps: '8-12',  note: 'Chest on pad for strict form' },
      { exercise: 'Straight-Arm Pulldown',  category: 'Back',      sets: 3, reps: '12-15', note: 'Full lat stretch + contraction' },
    ],
    // Wed — Shoulders
    [
      { exercise: 'Overhead Press',         category: 'Shoulders', sets: 4, reps: '6-8',   note: 'Press to lockout, lower with control' },
      { exercise: 'Dumbbell Shoulder Press',category: 'Shoulders', sets: 3, reps: '8-12',  note: 'Greater ROM than barbell press' },
      { exercise: 'Lateral Raise',          category: 'Shoulders', sets: 4, reps: '12-15', note: 'Lead with elbows, slight forward lean' },
      { exercise: 'Rear Delt Fly',          category: 'Shoulders', sets: 3, reps: '15-20', note: 'Often neglected — crucial for balance' },
      { exercise: 'Face Pull',              category: 'Shoulders', sets: 3, reps: '15-20', note: 'External rotation for shoulder health' },
    ],
    // Thu — Arms
    [
      { exercise: 'Barbell Curl',               category: 'Arms', sets: 4, reps: '8-10',  note: 'Strict curl — no swinging' },
      { exercise: 'Preacher Curl',              category: 'Arms', sets: 3, reps: '10-12', note: 'Peak contraction — squeeze hard' },
      { exercise: 'Concentration Curl',         category: 'Arms', sets: 3, reps: '12',    note: 'Slow and squeeze — mind-muscle' },
      { exercise: 'Tricep Pushdown',            category: 'Arms', sets: 4, reps: '10-12', note: 'Full lockout each rep' },
      { exercise: 'Overhead Tricep Extension',  category: 'Arms', sets: 3, reps: '10-12', note: 'Stretches long head for growth' },
    ],
    // Fri — Legs
    [
      { exercise: 'Barbell Squat',  category: 'Legs', sets: 5, reps: '6-8',   note: 'The king — build your foundation' },
      { exercise: 'Leg Press',      category: 'Legs', sets: 4, reps: '10-15', note: 'Go deep — butt stays on seat' },
      { exercise: 'Leg Extension',  category: 'Legs', sets: 3, reps: '12-15', note: 'Peak quad contraction at top' },
      { exercise: 'Leg Curl',       category: 'Legs', sets: 4, reps: '10-12', note: 'Full hamstring squeeze' },
      { exercise: 'Calf Raise',     category: 'Legs', sets: 5, reps: '15',    note: 'Calves need high volume to grow' },
    ],
    // Sat — Full Body conditioning
    [
      { exercise: 'Clean and Press', category: 'Full Body', sets: 4, reps: '5',    note: 'Explosive — total body athleticism' },
      { exercise: 'Battle Ropes',    category: 'Full Body', sets: 4, reps: '30sec', note: 'Maximum intensity conditioning' },
      { exercise: 'Plank',           category: 'Core',      sets: 3, reps: '60sec', note: 'Squeeze everything — full body tension' },
    ],
    // Sun — Rest
    [],
  ],

  cyclist: [
    // Mon — Long ride
    [
      { exercise: 'Cycling', category: 'Cardio', sets: 1, reps: '60min', note: 'Endurance base — keep cadence 85-95 rpm' },
    ],
    // Tue — Legs + Core
    [
      { exercise: 'Leg Press',  category: 'Legs', sets: 4, reps: '12-15',   note: 'Build cycling-specific quad strength' },
      { exercise: 'Calf Raise', category: 'Legs', sets: 4, reps: '15-20',   note: 'Critical for pedal stroke power' },
      { exercise: 'Lunges',     category: 'Legs', sets: 3, reps: '12 each', note: 'Unilateral leg strength' },
      { exercise: 'Plank',      category: 'Core', sets: 3, reps: '60sec',   note: 'Core stability = power transfer on the bike' },
    ],
    // Wed — Interval ride
    [
      { exercise: 'Stationary Bike', category: 'Cardio', sets: 1, reps: '45min', note: '5min warm-up then 10×2min hard / 2min easy' },
    ],
    // Thu — Rest
    [],
    // Fri — Long ride
    [
      { exercise: 'Cycling', category: 'Cardio', sets: 1, reps: '90min', note: 'Long endurance — bring your nutrition!' },
    ],
    // Sat — Cycling-support strength
    [
      { exercise: 'Romanian Deadlift', category: 'Legs', sets: 3, reps: '10-12', note: 'Posterior chain for climbing power' },
      { exercise: 'Bent-Over Row',     category: 'Back', sets: 3, reps: '10-12', note: 'Upper back for riding position' },
      { exercise: 'Plank',             category: 'Core', sets: 3, reps: '60sec', note: 'Core stability on the bike' },
    ],
    // Sun — Easy recovery ride
    [
      { exercise: 'Stationary Bike', category: 'Cardio', sets: 1, reps: '30min', note: 'Recovery ride — easy pace, flush the legs' },
    ],
  ],

  yogi: [
    // Mon — Core + Balance
    [
      { exercise: 'Plank',             category: 'Core', sets: 3, reps: '60sec',     note: 'Build the foundation — hold strong and breathe' },
      { exercise: 'Side Plank',        category: 'Core', sets: 3, reps: '45sec each', note: 'Balance and oblique strength' },
      { exercise: 'Mountain Climbers', category: 'Core', sets: 3, reps: '30sec',     note: 'Flowing movement — breathe through it' },
    ],
    // Tue — Light cardio
    [
      { exercise: 'Elliptical', category: 'Cardio', sets: 1, reps: '35min', note: 'Low impact — joint-friendly, mindful movement' },
    ],
    // Wed — Core + Flexibility
    [
      { exercise: 'Bicycle Crunches', category: 'Core', sets: 3, reps: '20', note: 'Slow, mindful rotation' },
      { exercise: 'Leg Raises',       category: 'Core', sets: 3, reps: '15', note: 'Controlled descent — breathe out on the way up' },
      { exercise: 'Russian Twists',   category: 'Core', sets: 3, reps: '20', note: 'Center yourself with each twist' },
    ],
    // Thu — Rest
    [],
    // Fri — Full body light
    [
      { exercise: 'Goblet Squat',        category: 'Legs',  sets: 3, reps: '15', note: 'Deep squat for hip mobility and awareness' },
      { exercise: 'Push-Ups',            category: 'Chest', sets: 3, reps: '12', note: 'Mindful movement — feel each rep' },
      { exercise: 'Dumbbell Bench Press',category: 'Chest', sets: 3, reps: '12', note: 'Controlled, breath-centered' },
    ],
    // Sat — Cardio + Core
    [
      { exercise: 'Elliptical', category: 'Cardio', sets: 1, reps: '40min', note: 'Rhythmic flow — find your breath' },
      { exercise: 'Plank',      category: 'Core',   sets: 3, reps: '60sec', note: 'End your session with stillness' },
    ],
    // Sun — Rest
    [],
  ],

  endurance: [
    // Mon — Long run
    [
      { exercise: 'Treadmill Run', category: 'Cardio', sets: 1, reps: '60min', note: 'Aerobic base — easy to moderate pace' },
    ],
    // Tue — Cross-training
    [
      { exercise: 'Stationary Bike', category: 'Cardio', sets: 1, reps: '45min', note: 'Active recovery — lower impact than running' },
      { exercise: 'Plank',           category: 'Core',   sets: 3, reps: '60sec', note: 'Core stability for running efficiency' },
    ],
    // Wed — Strength + Core
    [
      { exercise: 'Rowing Machine', category: 'Cardio', sets: 1, reps: '30min', note: 'Full body endurance + upper back strength' },
      { exercise: 'Calf Raise',     category: 'Legs',   sets: 3, reps: '20',    note: 'Injury prevention for runners' },
      { exercise: 'Leg Raises',     category: 'Core',   sets: 3, reps: '15',    note: 'Core for running posture' },
    ],
    // Thu — Rest
    [],
    // Fri — Speed work
    [
      { exercise: 'HIIT Sprints', category: 'Cardio', sets: 8, reps: '400m hard / 90sec rest', note: 'Speed work boosts aerobic capacity' },
    ],
    // Sat — Weekly long run
    [
      { exercise: 'Treadmill Run', category: 'Cardio', sets: 1, reps: '75min', note: 'Weekly long run — build mileage slowly' },
    ],
    // Sun — Active recovery
    [
      { exercise: 'Elliptical', category: 'Cardio', sets: 1, reps: '30min', note: 'Easy movement — flush lactic acid' },
    ],
  ],

  athlete: [
    // Mon — Explosive power
    [
      { exercise: 'Box Jumps',      category: 'Full Body', sets: 4, reps: '6',        note: 'Land soft — absorb through legs' },
      { exercise: 'Burpees',        category: 'Full Body', sets: 4, reps: '10',       note: 'Move with intention and power' },
      { exercise: 'Battle Ropes',   category: 'Full Body', sets: 4, reps: '30sec',    note: 'Full intensity — let it rip!' },
      { exercise: 'HIIT Sprints',   category: 'Cardio',    sets: 6, reps: '30sec max', note: 'Top gear — this is what athletes do' },
    ],
    // Tue — Strength foundation
    [
      { exercise: 'Deadlift',        category: 'Full Body', sets: 4, reps: '4-6', note: 'Athlete\'s #1 strength lift' },
      { exercise: 'Barbell Squat',   category: 'Legs',      sets: 4, reps: '4-6', note: 'Build the base of power' },
      { exercise: 'Clean and Press', category: 'Full Body', sets: 3, reps: '5',   note: 'Athletic movement through full range' },
    ],
    // Wed — Cardio + Core
    [
      { exercise: 'Rowing Machine', category: 'Cardio', sets: 1, reps: '20min', note: 'High intensity — go hard on intervals' },
      { exercise: 'Ab Rollout',     category: 'Core',   sets: 3, reps: '10-12', note: 'Full extension — athletic core strength' },
      { exercise: 'Russian Twists', category: 'Core',   sets: 3, reps: '20',    note: 'Rotational power for sport' },
    ],
    // Thu — Upper body
    [
      { exercise: 'Barbell Bench Press', category: 'Chest',     sets: 4, reps: '5-6', note: 'Push power for sport performance' },
      { exercise: 'Pull-Ups',            category: 'Back',      sets: 4, reps: '8-10', note: 'Add weight if possible' },
      { exercise: 'Overhead Press',      category: 'Shoulders', sets: 3, reps: '6-8', note: 'Pressing power overhead' },
    ],
    // Fri — Legs + Explosive
    [
      { exercise: 'Hack Squat',    category: 'Legs',      sets: 4, reps: '8',    note: 'Quad-dominant — explode out of the hole' },
      { exercise: 'Box Jumps',     category: 'Full Body', sets: 3, reps: '5',    note: 'Power — land and immediately reset' },
      { exercise: "Farmer's Walk", category: 'Full Body', sets: 4, reps: '40m',  note: 'Grip, core, and grit' },
    ],
    // Sat — Full body conditioning
    [
      { exercise: 'Turkish Get-Up',   category: 'Full Body', sets: 3, reps: '5 each', note: 'Master movement — total body coordination' },
      { exercise: 'Kettlebell Swing', category: 'Full Body', sets: 5, reps: '15',      note: 'Hinge power — this is the real deal' },
      { exercise: 'Jump Rope',        category: 'Cardio',    sets: 1, reps: '10min',   note: 'Footwork and cardio conditioning' },
    ],
    // Sun — Rest
    [],
  ],
};

// Fallback balanced plan if no fitness profile is set
export const DEFAULT_WORKOUT_PLAN: SuggestedExercise[][] = [
  // Mon
  [
    { exercise: 'Push-Ups',      category: 'Chest',   sets: 3, reps: '15', note: 'Great starting point — perfect form first' },
    { exercise: 'Bent-Over Row', category: 'Back',    sets: 3, reps: '12', note: 'Squeeze at the top' },
    { exercise: 'Plank',         category: 'Core',    sets: 3, reps: '45sec', note: 'Build your foundation' },
  ],
  // Tue
  [
    { exercise: 'Treadmill Run', category: 'Cardio',  sets: 1, reps: '25min', note: 'Comfortable pace — just keep moving' },
  ],
  // Wed
  [
    { exercise: 'Goblet Squat',      category: 'Legs',  sets: 3, reps: '12', note: 'Sink deep for full range' },
    { exercise: 'Romanian Deadlift', category: 'Legs',  sets: 3, reps: '12', note: 'Feel the hamstring stretch' },
  ],
  // Thu — Rest
  [],
  // Fri
  [
    { exercise: 'Kettlebell Swing', category: 'Full Body', sets: 4, reps: '12', note: 'Hinge power from your hips' },
    { exercise: 'Mountain Climbers', category: 'Core',     sets: 3, reps: '30sec', note: 'Fast and controlled' },
  ],
  // Sat
  [
    { exercise: 'Stationary Bike', category: 'Cardio', sets: 1, reps: '30min', note: 'Steady effort — enjoy it' },
  ],
  // Sun — Rest
  [],
];
