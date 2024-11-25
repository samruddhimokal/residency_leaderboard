"use client"

import React, { useState, useEffect, memo } from 'react';
import { ChevronDown,ChevronUp,TrendingUp, GitBranch, DollarSign, Users, Award, MessageCircle, Heart, Repeat2, Rotate3dIcon } from 'lucide-react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { constants } from 'buffer';


// const SHEET_ID = 'https://docs.google.com/spreadsheets/d/1jL5uergZkcgMc9C_4P_TsuxpfKNgHmBtGLZNlv0p7R8/edit?gid=918263195#gid=918263195';
// const doc = new GoogleSpreadsheet(SHEET_ID);

// async function fetchDataFromSheet() {
//   try {

//     console.log("indside the data")
//     // Initialize Auth - replace with path to your credentials file
//     await doc.useServiceAccountAuth(require('../../formal-theater-439611-r6-e88f2f12b810.json'));
//     await doc.loadInfo(); // loads document properties and worksheets

//     const sheet = doc.sheetsByIndex[0]; // Adjust index based on your needs
//     const rows = await sheet.getRows();
//     return rows.map(row => ({
//       name: row.name,
//       house: row.house,
//       value: row.value,
//       change: parseInt(row.change, 10),
//       detail: row.detail,
//     }));
//   } catch (error) {
//     console.error("Error: Could not load data from sheet", error);
//     return [];
//   }
// }






  



  
const HOUSE_COLORS = {
  "Pioneer House": "text-blue-400",
  "Innovator House": "text-purple-400",
  "Creator House": "text-pink-400",
  "Builder House": "text-orange-400",
  "Maker House": "text-green-400",
  "Founder House": "text-indigo-400",
  "Visionary House": "text-red-400"
};
const SAMPLE_TWEETS = [
  "Just launched a new project! 🚀",
"Collaborating on an exciting initiative 🤝",
"Made significant progress today 📈",
"Working on something special ✨",
"Great team meeting today! 💡",
"Exploring new ideas for innovation 🌟",
"Wrapping up a productive week! 🙌",
];

const STATIC_APPLICATIONS = [
  { house: "Pioneer House", value: 523, detail: "Active Applications", change: 12 },
  { house: "Innovator House", value: 1331, detail: "Active Applications", change: -5 },
  { house: "Creator House", value: 481, detail: "Active Applications", change: 8 },
  { house: "Builder House", value: 311, detail: "Active Applications", change: 3 },
  { house: "Maker House", value: 704, detail: "Active Applications", change: -2 },
  { house: "Founder House", value: 831, detail: "Active Applications", change: 6 },
  { house: "Visionary House", value: 1391, detail: "Active Applications", change: 15 }
];

const Globe = memo(() => {
  
  const [mounted, setMounted] = useState(false);
  const [activePoints, setActivePoints] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle globe rotation
  useEffect(() => {
    if (!mounted) return;

    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
    }, 50);

    return () => clearInterval(rotationInterval);
  }, [mounted]);

  // Handle points and tweets generation
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const newPoint = {
        id: Date.now(),
        x: -150 + Math.random() * 300,
        y: -75 + Math.random() * 150,
        scale: 0.8 + Math.random() * 0.4,
      };

      const newTweet = {
        id: newPoint.id,
        content: SAMPLE_TWEETS[Math.floor(Math.random() * SAMPLE_TWEETS.length)]
      };

      setActivePoints(prev => {
        const filtered = prev.filter(p => Date.now() - p.id < 2000);
        return filtered.length < 5 ? [...filtered, newPoint] : filtered;
      });

      setTweets(prev => {
        const filtered = prev.filter(t => Date.now() - t.id < 10000);
        return [newTweet, ...filtered].slice(0, 5);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gray-950 ">
      <div className="w-6xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800">
          <div className="flex p-4 gap-4 h-[600px]">
            {/* Globe Section */}
            <div className="flex-1 relative">
              <svg viewBox="0 0 800 600" className="w-full h-full">
                <defs>
                  <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1E4ED8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <g transform="translate(400 300)">
                  {/* Add rotation transform to the globe container */}
                  <g transform={`rotate(${rotation})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="250"
                      fill="url(#globeGradient)"
                      stroke="#4299E1"
                      strokeWidth="0.5"
                    />

                    {/* Latitude lines with perspective effect */}
                    {[...Array(8)].map((_, i) => (
                      <ellipse
                        key={`lat-${i}`}
                        cx="0"
                        cy="0"
                        rx="250"
                        ry={250 * Math.cos((i * Math.PI) / 14)}
                        fill="none"
                        stroke="#4299E1"
                        strokeWidth="0.5"
                        opacity="0.15"
                      />
                    ))}

                    {/* Longitude lines */}
                    {[...Array(12)].map((_, i) => (
                      <ellipse
                        key={`lon-${i}`}
                        cx="0"
                        cy="0"
                        rx="250"
                        ry="250"
                        fill="none"
                        stroke="#4299E1"
                        strokeWidth="0.5"
                        opacity="0.15"
                        transform={`rotate(${i * 30})`}
                      />
                    ))}

                    {/* Activity points */}
                    {activePoints.map((point) => (
                      <g key={point.id} transform={`translate(${point.x} ${point.y})`}>
                        <circle 
                          r={3 * point.scale} 
                          fill="#F59E0B" 
                          opacity="0.8" 
                        />
                        <circle
                          r={15 * point.scale}
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="2"
                          opacity="0.2"
                        >
                          <animate
                            attributeName="r"
                            from={15 * point.scale}
                            to={25 * point.scale}
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="0.2"
                            to="0"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    ))}
                  </g>
                </g>
              </svg>
            </div>

            {/* Live Stream Section */}
            {/* <div className="w-80">
              <div className="h-full bg-gray-900/50 backdrop-blur-md rounded-lg border border-gray-800">
                <div className="p-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    <h3 className="text-xs font-medium text-blue-400">Live Stream</h3>
                  </div>
                </div>
                <div className="h-[calc(100%-44px)] overflow-y-auto">
                  <div className="space-y-2 p-3">
                    {tweets.map((tweet) => (
                      <div
                        key={tweet.id}
                        className="bg-gray-800/50 p-2 rounded border border-gray-700/50"
                      >
                        <div className="text-xs text-gray-400 font-mono">{tweet.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
            <TwitterFeed/>
          </div>
        </div>
      </div>
    </div>
  );
});

Globe.displayName = 'Globe';




const LeaderboardCard = ({ title, data, showRank = true }) => {
  const [sortedData, setSortedData] = useState([]);
  
  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error('Data is not iterable:', data);
      setSortedData([]); // Fallback to an empty array
      return;
    }
  
    const sortData = () => {
      const newData = [...data].sort((a, b) => {
        const valueA = typeof a.revenue === 'string'
          ? Number(a.revenue.replace(/[^0-9.-]+/g, ""))
          : Number(a.revenue);
        const valueB = typeof b.revenue === 'string'
          ? Number(b.revenue.replace(/[^0-9.-]+/g, ""))
          : Number(b.revenue);
        return valueB - valueA;
      });
      setSortedData(newData);
    };
  
    sortData();
  }, [data]);
  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-8 relative">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-medium text-gray-100">{title}</h2>
        </div>
      </div>
      <div className="grid gap-4 max-h-[470px] overflow-y-auto pr-2">
        {sortedData.map((item, index) => (
          <div
            key={item.name}
            className="group flex items-start justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            style={{ minHeight: '80px' }}
          >
            <div className="flex items-start gap-4">
              {showRank && (
                <div className="text-gray-500 font-mono w-6 pt-1">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium text-gray-100 mb-1">
                  {showRank ? item.resident : item.house}
                </div>
                <div className={`text-sm ${HOUSE_COLORS[item.house]}`}>
                  {showRank ? item.house : item.detail}
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-mono font-semibold text-gray-100 mb-1">
                {typeof item.revenue === 'number' ? `$${item.revenue.toLocaleString()}` : item.revenue}
                {typeof item.change !== 'undefined' && (
                  <span
                    className={`ml-2 text-sm ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                  </span>
                )}
              </div>
              {showRank && <div className="text-sm text-gray-400">{item.detail}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
LeaderboardCard.displayName = 'LeaderboardCard';

const TwitterFeed = memo(() => {
  const tweets = [
    {
      id: 1,
      author: "Ash",
      handle: "@0xAbilash",
      content: "Meeet PixelPal AI",
     
      likes: 11,
      retweets: 2,
      replies: 6
    },
    {
      id: 2,
      author: "Gleb Razgar",
      handle: "@project_gleb",
      content: "Hats off to @_TheResidency for helping bring the hacker house together.",
     
      likes: 47,
      retweets: 5,
      replies: 6
    },
    {
      id: 3,
      author: "Vikrant Patankar",
      handle: "@vikr13nt",
      content: "Playing with hundreds of millions of dollars",
      
      likes: 1,
      retweets: 0,
      replies: 0
    }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-8 border border-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-medium text-gray-100">Latest Updates</h2>
      </div>
      <div className="space-y-6">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-sm font-bold">{tweet.author[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{tweet.author}</span>
                  <span className="text-gray-500 text-sm">{tweet.handle}</span>
                  <span className="text-gray-500 text-sm">·</span>
                  <span className="text-gray-500 text-sm">{tweet.timestamp}</span>
                </div>
                <p className="mt-2 text-gray-100">{tweet.content}</p>
                <div className="flex items-center gap-6 mt-4">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{tweet.replies}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-sm">{tweet.retweets}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{tweet.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

TwitterFeed.displayName = 'TwitterFeed';

export default function DashboardDemo() {

  const [residences, setResidences] = useState([]);
  const [grants, setGrants] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [house, setHouse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const links = {
      residents: 'https://script.googleusercontent.com/macros/echo?user_content_key=_Hn7XQ1Tz05t8KFXVgC0XcOv9qqR82x5fPeJhorGztcnQFSeMkm0x3JMUjBAfXDvAd6SGSSdHo8j6g9a5chj0BneMvC-6aSYm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCRfytznPhufLoQ0A_qwCpAWuu2yCiWw02b8C_JplW3M-BaFmpSV9dMvgTYx5Jpj8xtXuny5gyM0ohIgDacCEvpsCbtnK4XfiQ&lib=MHFQDdH3kqbOE-evStmhhjMMngc_g7vfE',
      grants: 'https://script.google.com/macros/s/AKfycbxO6pSArxbJy9hh1lXDqcTQCcoaGr3Xa53UGuUYUWSQQBh-WlI8K2gbHvto5oL0L0yY/exec',
      investments: 'https://script.google.com/macros/s/AKfycbwl-7uKWzTPUNV6btxMrUSj0efWo9-41kVx-3bnpwVopxRXirGwrAJpz9GVID60JuMt3Q/exec',
      houses:"https://script.googleusercontent.com/macros/echo?user_content_key=yawgMUS-uaIkd004IryvhN9GHffMhci-DKAf6R-5_f6lEDiA8y9WtSuJMeyWIHuAvyIX7B14w6gRcIadzZtDL302RlAfwQlpm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNPEugizz5HSeF_ttZuLgpWwLpxgsEw7rR4meR5_67XptVCgKPgonMioIYdmfER9kIhC2x9LEUuyC_FnVo9zHNE2yrPrPF3qgtz9Jw9Md8uu&lib=MpWCmBbv8BIEZ-C71fGN3YX7dSxyY7qhE"
    };

    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(links.residents),
          fetch(links.grants),
          fetch(links.investments),
          fetch(links.houses),
        ]);

        // Check if all responses are ok
        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data from one or more links');
          }
        });

        // Parse JSON for all responses
        const data = await Promise.all(responses.map((response) => response.json()));

        // Assign the data
        setResidences(data[0]); // Residents data
        setGrants(data[1]);     // Grants data
        setInvestments(data[2]); // Investments data
        setHouse(data[3]); // Revenue data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dataA = Array.isArray(residences.allResidents) ? residences.allResidents : [];
  const dataB = Array.isArray(grants.allResidents) ? grants.allResidents : [];
  const dataC = Array.isArray(investments.allResidents) ? investments.allResidents : [];
  const dataD = Array.isArray(house.allResidents) ? house.allResidents : [];
  console.log(dataC)
  console.log(dataD)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const topRevenue = [
    { name: "Alpha Team", house: "Pioneer House", value: "$1,234,567", change: 12, detail: "45 projects" },
    { name: "Beta Squad", house: "Innovator House", value: "$987,654", change: -5, detail: "38 projects" },
    { name: "Gamma Group", house: "Creator House", value: "$876,543", change: 8, detail: "42 projects" },
    { name: "Delta Force", house: "Builder House", value: "$765,432", change: 3, detail: "35 projects" },
    { name: "Epsilon Unit", house: "Maker House", value: "$654,321", change: -2, detail: "31 projects" }
  ];

  const topGrants = [
    { name: "Research X", house: "Visionary House", value: "$300,000", change: 15, detail: "AI Research" },
    { name: "Project Y", house: "Founder House", value: "$450,000", change: 7, detail: "Blockchain" },
    { name: "Initiative Z", house: "Pioneer House", value: "$400,000", change: -3, detail: "Climate Tech" },
    { name: "Program A", house: "Creator House", value: "$350,000", change: 5, detail: "Biotech" },
    { name: "Study B", house: "Innovator House", value: "$500,000", change: 10, detail: "Quantum Computing" }
  
  ];

  const topInvestments = [
    { name: "Venture 1", house: "Builder House", value: "$2,000,000", change: 20, detail: "Series A" },
    { name: "Startup 2", house: "Maker House", value: "$1,500,000", change: -8, detail: "Seed Round" },
    { name: "Company 3", house: "Visionary House", value: "$1,200,000", change: 15, detail: "Series B" },
    { name: "Project 4", house: "Founder House", value: "$900,000", change: 6, detail: "Angel Round" },
    { name: "Enterprise 5", house: "Pioneer House", value: "$800,000", change: -4, detail: "Pre-seed" }
  ];

  const topGitHub = [
    { resident: "Basim Al Harbi", house: "Arcadia",   detail: "commando" },
    { resident: "Paritosh Kulkarni", house: "Arcadia",   detail: "antiaging_app" },
    { resident: "Abilash Senthilkumar", house: "Bangalore",   detail: "InstaAR-Augmented-Reality" },
    { resident: "Pulkit Garg", house: "Bangalore",  detail: "openai-swarm-node" },
    { resident: "Nirbhay Singh Narang", house: "New York",   detail: "InvenTree-iOS" }
  ];

 
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-gray-100 mb-2">Global House Activity</h1>
          <p className="text-lg text-gray-400">Real-time performance metrics</p>
        </div>

        <Globe />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LeaderboardCard
            title="Top Revenue"
            icon={<TrendingUp />}
            data={dataA}
          />
          <LeaderboardCard
            title="Top Grants"
            icon={<Award />}
            data={dataB}
          />
          <LeaderboardCard
            title="Top Investments"
            icon={<DollarSign />}
            data={dataC}
          />
          <LeaderboardCard
            title="Top GitHub Activity"
            icon={<GitBranch />}
            data={topGitHub}
          />
          <div className="md:col-span-2">
            <LeaderboardCard
              title="Applications by House"
              icon={<Users />}
              data={STATIC_APPLICATIONS}
              showRank={false}
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}























