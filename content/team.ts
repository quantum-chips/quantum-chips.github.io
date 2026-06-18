// Project team for "Automating Security Testing of Quantum Safe Chips".
// Bios for the UQ members are drawn from their official UQ Cyber Research Centre
// profiles (linked). Photos are the official UQ profile headshots.
export type Member = {
  name: string;
  role: string;
  org: string;
  bio: string;
  initials: string;
  photo?: string;
  profileUrl?: string;
};

export const TEAM: Member[] = [
  {
    name: "Dr Naipeng Dong",
    role: "Project Lead",
    org: "The University of Queensland",
    bio: "Senior Lecturer in the School of Electrical Engineering and Computer Science and an affiliate of the UQ Cyber Research Centre. Her research focuses on automatic formal verification of security and privacy in cryptographic protocols, blockchain and applications.",
    initials: "ND",
    photo: "/team/naipeng-dong.jpg",
    profileUrl: "https://www.cyber.uq.edu.au/profile/386/naipeng-dong",
  },
  {
    name: "Prof Ryan Ko",
    role: "Co-Investigator",
    org: "The University of Queensland",
    bio: "Chair Professor & Director of Cyber Security at UQ and Director of the UQ Cyber Research Centre. His research spans cloud security, data provenance and systems security, and he has led major national cyber security initiatives.",
    initials: "RK",
    photo: "/team/ryan-ko.jpg",
    profileUrl: "https://www.cyber.uq.edu.au/profile/245/ryan-ko",
  },
  {
    name: "Mrs Kana Smith",
    role: "Centre Manager",
    org: "The University of Queensland",
    bio: "Centre Manager of the UQ Cyber Research Centre since 2021, leading strategic planning, business development and the delivery of research grants and partnerships.",
    initials: "KS",
    photo: "/team/kana-smith.jpg",
    profileUrl: "https://www.cyber.uq.edu.au/profile/242/kana-smith",
  },
  {
    name: "Mr Chen Feng Chang",
    role: "Industry Partner",
    org: "SEMICON TREND PTY LTD",
    bio: "Industry partner from SEMICON TREND PTY LTD, supporting the project's pathway toward real-world testing of quantum-safe chips.",
    initials: "CC",
  },
  {
    name: "Dr Wenlu Zhang",
    role: "Postdoctoral Research Fellow",
    org: "The University of Queensland",
    bio: "Postdoctoral Research Fellow affiliated with the UQ Cyber Research Centre, with a background in software engineering, cyber security and machine learning.",
    initials: "WZ",
    photo: "/team/wenlu-zhang.jpg",
    profileUrl: "https://www.cyber.uq.edu.au/profile/513/wenlu-zhang",
  },
  {
    name: "Dr Zihan Wang",
    role: "Postdoctoral Research Fellow",
    org: "The University of Queensland",
    bio: "Postdoctoral Research Fellow in the School of Electrical Engineering and Computer Science at UQ. His research focuses on AI usage control — governing how trained models and their training data can be reused, repurposed or queried after release.",
    initials: "ZW",
    photo: "/team/zihan-wang.jpg",
    profileUrl: "https://www.zihan.com.au/",
  },
];
