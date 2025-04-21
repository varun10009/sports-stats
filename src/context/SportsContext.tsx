
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Sport = {
  id: number;
  name: string;
  image: string;
  description: string;
};

type Player = {
  id: number;
  name: string;
  image: string;
  team: string;
  position: string;
  stats: {
    points: number;
    assists: number;
    rebounds?: number;
    goals?: number;
    tackles?: number;
    saves?: number;
  };
};

type Team = {
  id: number;
  name: string;
  logo: string;
  sport: string;
  description: string;
  stats: {
    wins: number;
    losses: number;
    ties?: number;
    points?: number;
    ranking: number;
  };
};

type Article = {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
  author: string;
};

type SportsContextType = {
  sports: Sport[];
  players: Player[];
  teams: Team[];
  news: Article[];
  isLoading: boolean;
  error: string | null;
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
  fetchTeams: (sportName: string) => void;
  fetchPlayers: (teamName: string) => void;
};

const SportsContext = createContext<SportsContextType | undefined>(undefined);

export const useSportsContext = () => {
  const context = useContext(SportsContext);
  if (context === undefined) {
    throw new Error('useSportsContext must be used within a SportsProvider');
  }
  return context;
};

export const SportsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('basketball');

  // Fetch sports data
  useEffect(() => {
    const fetchSports = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For now we'll use mock data
        const response = [
          {
            id: 1,
            name: 'Basketball',
            image: 'https://images.unsplash.com/photo-1546519638-68e109acd618',
            description: 'Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court.'
          },
          {
            id: 2,
            name: 'Football',
            image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7485',
            description: 'Football is a team sport played between two teams of 11 players with a spherical ball.'
          },
          {
            id: 3,
            name: 'Tennis',
            image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c1',
            description: 'Tennis is a racket sport that can be played individually against a single opponent or between two teams of two players each.'
          },
          {
            id: 4,
            name: 'Cricket',
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
            description: 'Cricket is a bat-and-ball game played between two teams of eleven players on a field at the center of which is a 22-yard pitch.'
          }
        ];
        
        setSports(response);
        
        fetchNews();
        fetchTeams(selectedSport);
        
      } catch (error) {
        setError('Failed to fetch sports data');
        console.error('Error fetching sports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSports();
  }, [selectedSport]);

  const fetchNews = async () => {
    try {
      // Mock news data
      const newsData = [
        {
          id: 1,
          title: 'Lakers Win Championship',
          summary: 'The Los Angeles Lakers have won their 18th NBA championship after a thrilling Game 7.',
          date: '2025-04-15',
          image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a',
          author: 'John Smith'
        },
        {
          id: 2,
          title: 'New Transfer Record',
          summary: 'Manchester United breaks transfer record with their new signing.',
          date: '2025-04-12',
          image: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253',
          author: 'Jane Doe'
        },
        {
          id: 3,
          title: 'Grand Slam Surprise',
          summary: 'Unexpected winner takes home the trophy at this year\'s first Grand Slam.',
          date: '2025-04-10',
          image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece',
          author: 'Alex Johnson'
        },
        {
          id: 4,
          title: 'Olympic Committee Announces Changes',
          summary: 'New sports added to the upcoming Olympic Games lineup.',
          date: '2025-04-08',
          image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6',
          author: 'Sam Brown'
        }
      ];
      
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchTeams = async (sportName: string) => {
    setIsLoading(true);
    try {
      // Mock data - in a real app this would be an API call filtered by sport
      let teamsData: Team[] = [];
      
      if (sportName.toLowerCase() === 'basketball') {
        teamsData = [
          {
            id: 1,
            name: 'LA Lakers',
            logo: 'https://via.placeholder.com/150',
            sport: 'basketball',
            description: 'One of the most successful teams in the NBA.',
            stats: { wins: 45, losses: 27, ranking: 2, points: 110.5 }
          },
          {
            id: 2,
            name: 'Boston Celtics',
            logo: 'https://via.placeholder.com/150',
            sport: 'basketball',
            description: 'Historic NBA franchise with numerous championships.',
            stats: { wins: 49, losses: 23, ranking: 1, points: 112.3 }
          },
          {
            id: 3,
            name: 'Golden State Warriors',
            logo: 'https://via.placeholder.com/150',
            sport: 'basketball',
            description: 'Recent dynasty in the NBA.',
            stats: { wins: 40, losses: 32, ranking: 5, points: 115.7 }
          }
        ];
      } else if (sportName.toLowerCase() === 'football') {
        teamsData = [
          {
            id: 4,
            name: 'Manchester United',
            logo: 'https://via.placeholder.com/150',
            sport: 'football',
            description: 'Premier League giants with a rich history.',
            stats: { wins: 22, losses: 8, ties: 5, ranking: 2, points: 71 }
          },
          {
            id: 5,
            name: 'Real Madrid',
            logo: 'https://via.placeholder.com/150',
            sport: 'football',
            description: 'One of the most successful football clubs in the world.',
            stats: { wins: 25, losses: 5, ties: 5, ranking: 1, points: 80 }
          }
        ];
      } else if (sportName.toLowerCase() === 'tennis') {
        teamsData = []; // Tennis is individual
      }
      
      setTeams(teamsData);
      
      if (teamsData.length > 0) {
        fetchPlayers(teamsData[0].name);
      } else {
        setPlayers([]);
      }
      
    } catch (error) {
      setError('Failed to fetch teams data');
      console.error('Error fetching teams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlayers = async (teamName: string) => {
    setIsLoading(true);
    try {
      // Mock data - in a real app this would be an API call filtered by team
      let playersData: Player[] = [];
      
      if (teamName === 'LA Lakers') {
        playersData = [
          {
            id: 1,
            name: 'LeBron James',
            image: 'https://via.placeholder.com/150',
            team: 'LA Lakers',
            position: 'Forward',
            stats: { points: 27.5, assists: 8.3, rebounds: 7.8 }
          },
          {
            id: 2,
            name: 'Anthony Davis',
            image: 'https://via.placeholder.com/150',
            team: 'LA Lakers',
            position: 'Forward/Center',
            stats: { points: 24.7, assists: 3.1, rebounds: 12.4 }
          }
        ];
      } else if (teamName === 'Boston Celtics') {
        playersData = [
          {
            id: 3,
            name: 'Jayson Tatum',
            image: 'https://via.placeholder.com/150',
            team: 'Boston Celtics',
            position: 'Forward',
            stats: { points: 26.9, assists: 4.4, rebounds: 8.0 }
          },
          {
            id: 4,
            name: 'Jaylen Brown',
            image: 'https://via.placeholder.com/150',
            team: 'Boston Celtics',
            position: 'Guard/Forward',
            stats: { points: 23.8, assists: 3.5, rebounds: 6.3 }
          }
        ];
      } else if (teamName === 'Manchester United') {
        playersData = [
          {
            id: 5,
            name: 'Marcus Rashford',
            image: 'https://via.placeholder.com/150',
            team: 'Manchester United',
            position: 'Forward',
            stats: { points: 0, goals: 15, assists: 7 }
          },
          {
            id: 6,
            name: 'Bruno Fernandes',
            image: 'https://via.placeholder.com/150',
            team: 'Manchester United',
            position: 'Midfielder',
            stats: { points: 0, goals: 12, assists: 14 }
          }
        ];
      }
      
      setPlayers(playersData);
    } catch (error) {
      setError('Failed to fetch players data');
      console.error('Error fetching players:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    sports,
    players,
    teams,
    news,
    isLoading,
    error,
    selectedSport,
    setSelectedSport,
    fetchTeams,
    fetchPlayers,
  };

  return <SportsContext.Provider value={value}>{children}</SportsContext.Provider>;
};
