// src/data/mockData.ts
export const dashboardStats = {
  totalUsers: 200,
  fraudAlerts: 10,
  cardRequests: 130,
  transactionVolume: 1430,
};

// export const cardRequests = [
//   { id: 1, name: "Deepak Kumar", cardType: "Platinum Credit Card", avatarInitials: "DK", avatarBg: "bg-blue-100" },
//   { id: 2, name: "Meera Joshi", cardType: "Gold Credit Card", avatarInitials: "MJ", avatarBg: "bg-purple-100" },
//   { id: 3, name: "Suresh Patel", cardType: "Classic Credit Card", avatarInitials: "SP", avatarBg: "bg-yellow-100" },
// ];

export const fraudMetrics = [
  { name: "Mon", normal: 60, suspicious: 0 },
  { name: "Tue", normal: 45, suspicious: 0 },
  { name: "Wed", normal: 80, suspicious: 0 },
  { name: "Thu", normal: 30, suspicious: 0 },
  { name: "Fri", normal: 50, suspicious: 0 },
  { name: "Sat", normal: 40, suspicious: 20 },

  { name: "Jan", normal: 3800, suspicious: 200 },
  { name: "Feb", normal: 2900, suspicious: 150 },
  { name: "Mar", normal: 1900, suspicious: 300 },
  { name: "Apr", normal: 2700, suspicious: 250 },
  { name: "May", normal: 1800, suspicious: 400 },
  { name: "Jun", normal: 2300, suspicious: 350 },
  { name: "Jul", normal: 3400, suspicious: 200 },
  { name: "Aug", normal: 3900, suspicious: 150 },
  { name: "Sep", normal: 2900, suspicious: 300 },
  { name: "Oct", normal: 1900, suspicious: 400 },
  { name: "Nov", normal: 2700, suspicious: 250 },
  { name: "Dec", normal: 3800, suspicious: 200 },
];


export const fraudTypes = [
  { name: "Phishing", value: 35 },
  { name: "Card Skimming", value: 25 },
  { name: "Identity Theft", value: 20 },
  { name: "Online Fraud", value: 15 },
  { name: "Other", value: 5 },
];


export const fraudTypeDistribution = [
  { name: "Card Fraud", value: 50, color: "#EF4444" },
  { name: "Identity Theft", value: 30, color: "#F59E0B" },
  { name: "Phishing", value: 20, color: "#3B82F6" },
];

export const recentFraudAlerts = [
  {
    id: 1,
    transactionId: "TRX-5824691",
    customerName: "Rahul Mehta",
    accountNumber: "2458",
    amount: 24580,
    fraudType: "Card Fraud",
    date: "2023-05-25",
    status: "Pending Review",
    avatarInitials: "RM",
    avatarBg: "bg-blue-100",
  },
  {
    id: 2,
    transactionId: "TRX-5824579",
    customerName: "Priya Singh",
    accountNumber: "3672",
    amount: 18200,
    fraudType: "Phishing",
    date: "2023-05-24",
    status: "Confirmed Fraud",
    avatarInitials: "PS",
    avatarBg: "bg-green-100",
  },
  {
    id: 3,
    transactionId: "TRX-5824372",
    customerName: "Anand Kumar",
    accountNumber: "5891",
    amount: 9450,
    fraudType: "Identity Theft",
    date: "2023-05-24",
    status: "Resolved",
    avatarInitials: "AK",
    avatarBg: "bg-yellow-100",
  },
];

export const authorizationRequests = [
  {
    id: 1,
    name: "Vikram Sharma",
    email: "vikram.s@gmail.com",
    type: "New Account",
    date: "2023-05-24",
    kycStatus: "Verified",
    riskScore: "Low",
    riskPercentage: 20,
    avatarInitials: "VS",
    avatarBg: "bg-teal-100",
  },
  {
    id: 2,
    name: "Anjali Rao",
    email: "anjali.r@outlook.com",
    type: "Credit Card",
    date: "2023-05-23",
    kycStatus: "Pending",
    riskScore: "Medium",
    riskPercentage: 50,
    avatarInitials: "AR",
    avatarBg: "bg-pink-100",
  },
];

export const resources = [
  {
    id: 1,
    title: "Credit Card Fraud Detection Guide",
    type: "document",
    date: "2023-05-15",
    icon: "fas fa-file-alt",
  },
  {
    id: 2,
    title: "Training Video: Identifying Suspicious Transactions",
    type: "video",
    duration: "23 minutes",
    icon: "fas fa-video",
  },
  {
    id: 3,
    title: "RBI Guidelines on Fraud Prevention",
    type: "document",
    date: "2023-04-30",
    icon: "fas fa-file-alt",
  },
];

//card request data

export const cardRequests = [
  {
    id: "CR001",
    name: "Amit Sharma",
    avatarInitials: "AS",
    avatarBg: "bg-blue-100",
    cardType: "Credit Card",
    date: "2025-05-10",
    status: "Pending"
  },
  {
    id: "CR002",
    name: "Priya Patel",
    avatarInitials: "PP",
    avatarBg: "bg-purple-100",
    cardType: "Debit Card",
    date: "2025-05-12",
    status: "Pending"
  },
  {
    id: "CR003",
    name: "Rahul Verma",
    avatarInitials: "RV",
    avatarBg: "bg-green-100",
    cardType: "Credit Card",
    date: "2025-05-08",
    status: "Pending"
  },
  {
    id: "CR004",
    name: "Sneha Gupta",
    avatarInitials: "SG",
    avatarBg: "bg-orange-100",
    cardType: "Prepaid Card",
    date: "2025-05-05",
    status: "Pending"
  }
];