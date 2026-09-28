export const BOOT_LINES = [
  "Initializing Mercy.exe...",
  "Mounting personality drivers...",
  "Scanning emotional dependencies...",
  "Checking Docker containers...",
  "Analyzing financial stability...",
  "Checking Pilates consistency...",
  "Detecting unnecessary overthinking...",
  "Cross-referencing excuses with calendar...",
  "Compiling self-awareness module...",
];

export const SUBSYSTEMS = [
  { name: "Academic subsystem", states: ["OPERATIONAL", "CAFFEINE-DEPENDENT", "DEADLINE-DRIVEN", "STABLE"] },
  { name: "Career subsystem", states: ["UNDER CONSTRUCTION", "LOADING...", "PROGRESSING", "RECALCULATING"] },
  { name: "DevOps subsystem", states: ["PROGRESSING", "CONTAINERIZED", "MOSTLY GREEN", "YAML-LIMITED"] },
  { name: "Romantic decision-making subsystem", states: ["REQUIRES SUPERVISION", "UNDER REVIEW", "ROLLBACK ADVISED", "QUARANTINED"] },
  { name: "Financial subsystem", states: ["LOW POWER MODE", "RATIONING", "SURPRISINGLY OKAY", "AIRPLANE MODE"] },
  { name: "Pilates subsystem", states: ["INITIALIZING", "WARMING UP", "CORE ENGAGED", "SCHEDULED FOR LATER"] },
  { name: "Sleep subsystem", states: ["DEPRECATED", "PARTIALLY RESTORED", "NEGOTIATING", "OVERCLOCKED"] },
  { name: "Overthinking daemon", states: ["RUNNING (as always)", "CONSUMING 62% RAM", "CANNOT BE KILLED", "IDLE (suspicious)"] },
];

export const CHAOS_MESSAGES = [
  "WARNING: You have opened Instagram instead of studying.",
  "Critical error: Romantic expectations exceed available men.",
  "Docker is working. Nobody knows why.",
  "Financial subsystem recommends going home.",
  "Reddington trust level: 31%.",
  "System has detected unnecessary overthinking.",
  "Notice: 14 browser tabs are hostages, not resources.",
  "Kernel panic: someone said 'we should link up' with no date attached.",
  "Sleep debt has accrued interest. Repayment plan unavailable.",
  "Alert: you reread that message. Again.",
  "Terraform plan shows 1 to add, 0 to change, 4 feelings to destroy.",
  "Your water intake is currently theoretical.",
  "Motivation service failed to start. Retrying at 11:58 PM.",
  "Reminder: the assignment does not write itself. This was tested.",
  "Detected: cleaning the entire room to avoid one email.",
  "Budget forecast: vibes. Confidence: low.",
  "You have 3 unfinished side projects awaiting resurrection.",
  "Pilates mat status: decorative.",
  "Someone typed 'k'. Escalating to incident severity 2.",
  "You explained Docker at a party. Nobody recovered.",
  "Spotify has entered its 4th consecutive sad-girl phase.",
  "Warning: buying snacks counts as a financial decision.",
  "Your future self has opened a support ticket.",
  "AWS bill approaching emotionally significant number.",
  "You are not behind. You are just extremely aware.",
];

export const DEVOPS_SKILLS = [
  { name: "AWS", value: 62, note: "Console navigation: fluent. Billing alerts: feared." },
  { name: "Linux", value: 74, note: "Can exit vim. Voluntarily." },
  { name: "Git / GitHub", value: 81, note: "Branch names remain aspirational." },
  { name: "Docker", value: 58, note: "Container status: probably working." },
  { name: "Terraform", value: 41, note: "State file guarded like a diary." },
  { name: "CI/CD", value: 49, note: "Pipeline green on the 7th attempt." },
];

export const DEVOPS_INCIDENTS = [
  { incident: "User has been staring at a Dockerfile for 47 minutes.", remediation: "Touch grass." },
  { incident: "Merge conflict resolved by vibes.", remediation: "Read the diff. Just once." },
  { incident: "Pipeline failed on a trailing whitespace.", remediation: "Blame YAML. It deserves it." },
  { incident: "terraform destroy typed in the wrong terminal.", remediation: "Breathe. Check the workspace." },
  { incident: "Logs read top to bottom, panic read bottom to top.", remediation: "grep, then panic." },
];

export const TERMINAL_RESPONSES: Record<string, string[]> = {
  "docker ps": [
    "CONTAINER ID    IMAGE          STATUS",
    "merc01          mercy-app      Up 47 minutes",
    "ovr99           overthinking   Up 6 days (unhealthy)",
    "",
    'SYSTEM MESSAGE: "Congratulations. Nothing is on fire."',
  ],
  "git status": [
    "On branch feature/self-improvement",
    "Your branch is 14 commits behind origin/plans.",
    "",
    "Changes not staged for commit:",
    "  modified:   sleep_schedule.ts",
    "  deleted:    weekend.md",
    "",
    'SYSTEM MESSAGE: "Commit something. Anything."',
  ],
  "terraform plan": [
    "Plan: 2 to add, 1 to change, 4 feelings to destroy.",
    "  + module.pilates.consistency",
    "  + module.savings.account",
    "  ~ module.romance.expectations",
    "",
    'SYSTEM MESSAGE: "Apply at your own risk."',
  ],
  "aws s3 ls": [
    "2026-01-04 09:12  mercy-notes-backup",
    "2026-02-18 21:40  screenshots-i-will-never-open",
    "2026-06-02 03:07  final_FINAL_v7",
    "",
    'SYSTEM MESSAGE: "Storage is cheap. Your attention is not."',
  ],
  whoami: [
    "mercy",
    "roles: student, devops-in-progress, chief overthinking officer",
    "uptime: suspiciously long",
  ],
  help: [
    "Available commands:",
    "  docker ps | git status | terraform plan | aws s3 ls",
    "  whoami | uptime | sudo rm -rf feelings | clear | help",
  ],
  uptime: ["up 21 years, 4 months, running on snacks and spite."],
  "sudo rm -rf feelings": [
    "Permission denied.",
    'SYSTEM MESSAGE: "Nice try. Feelings are mounted read-only."',
  ],
};

export const PILATES_SESSIONS = [
  { id: "core-basics", title: "Core Basics", minutes: 15, level: "Beginner" as const },
  { id: "mat-flow", title: "Mat Flow", minutes: 25, level: "Beginner" as const },
  { id: "mobility-reset", title: "Mobility Reset", minutes: 20, level: "Beginner" as const },
  { id: "controlled-breathing", title: "Breath & Control", minutes: 12, level: "Beginner" as const },
  { id: "full-body", title: "Full Body Flow", minutes: 35, level: "Intermediate" as const },
  { id: "stability", title: "Stability Work", minutes: 30, level: "Intermediate" as const },
];

export const PILATES_MESSAGES = [
  "Core subsystem activated.",
  "Pilates session detected.",
  "Mobility.exe is running.",
  "Consistency levels increasing.",
  "System recommends controlled breathing.",
];

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}
