'use client';

import React, { useState, useEffect, useRef } from 'react';
import BirthdayCard from './BirthdayCard';
import NotificationPanel from './NotificationPanel';
import QuickActions from './QuickActions';
import Icon from '@/components/ui/AppIcon';
import mockData from '@/data/staff-mock-data.json';
interface BirthdayPerson {
  id: number;
  name: string;
  department: string;
  age: number;
  image: string;
  alt: string;
  birthday: string;
  daysUntil: number;
  preferences: {
    cakeType: string;
    dietaryRestrictions: string[];
    celebrationStyle: string;
  };
  notes: string;
}

interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
}

const ThisMonthBirthdaysInteractive = () => {
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Birthday songs playlist
  const birthdaySongs = [
    {
      title: 'Happy Birthday Classic',
      url: '/audio/happy-birthday-155461.mp3',
    },
    { title: 'Birthday Celebration', url: '/audio/happy-birthday-155461.mp3' }, // Add more songs if you have them
  ];

  // Birthday video background
  const birthdayVideo = '/videos/happy-birthday-155461.mp3';

  // Get current month's birthdays
  const getCurrentMonthBirthdays = (): BirthdayPerson[] => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return mockData.staff
      .filter((staff) => {
        const birthday = new Date(staff.birthday);
        return birthday.getMonth() === currentMonth;
      })
      .map((staff) => {
        const birthday = new Date(staff.birthday);
        const today = new Date();

        const thisYearBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());
        const daysUntil = Math.ceil(
          (thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          id: parseInt(staff.id),
          name: staff.name,
          department: staff.department,
          age: staff.age,
          image: staff.image,
          alt: staff.alt,
          birthday: staff.birthday,
          daysUntil: daysUntil,
          preferences: {
            dietaryRestrictions: staff.dietaryRestrictions,
          },
          notes: staff.notes,
        };
      })
      .sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const mockBirthdays = getCurrentMonthBirthdays();
  useEffect(() => {
    if (mockBirthdays.length > 0 && selectedPerson === null) {
      setSelectedPerson(mockBirthdays[0].id);
    }
  }, [mockBirthdays, selectedPerson]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = birthdaySongs[currentSongIndex].url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (isAutoPlaying && mockBirthdays.length > 0) {
      slideshowIntervalRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % mockBirthdays.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
    };
  }, [isAutoPlaying, mockBirthdays.length]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % birthdaySongs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + birthdaySongs.length) % birthdaySongs.length);
  };

  const startSlideshow = () => {
    setShowSlideshow(true);
    setCurrentSlideIndex(0);
    setIsAutoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
    if (!isPlaying && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopSlideshow = () => {
    setShowSlideshow(false);
    setIsAutoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % mockBirthdays.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + mockBirthdays.length) % mockBirthdays.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleUpdateStatus = (id: number, status: string) => {
    console.log(`Updated status for person ${id}: ${status}`);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAddNote = (id: number, note: string) => {
    console.log(`Added note for person ${id}: ${note}`);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleChecklistComplete = () => {
    console.log('Celebration checklist completed');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action triggered: ${action}`);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const selectedPersonData = mockBirthdays.find((p) => p.id === selectedPerson);
  const currentMonthName = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const getDaysUntilText = (days: number) => {
    if (days === 0) return 'Today! 🎉';
    if (days === 1) return 'Tomorrow';
    if (days < 0) return `${Math.abs(days)} days ago`;
    return `In ${days} days`;
  };

  const currentSlidePerson = mockBirthdays[currentSlideIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-celebration/10 pt-32 lg:pt-20 pb-8 px-4 lg:pl-72">
      <audio ref={audioRef} onEnded={nextSong} loop />

      {/* Slideshow Modal */}
      {showSlideshow && currentSlidePerson && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Video Background */}
          <video
            ref={videoRef}
            src={birthdayVideo}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            loop
            muted
            playsInline
          />

          {/* Close Button */}
          <button
            onClick={stopSlideshow}
            className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
          >
            <Icon name="XMarkIcon" size={24} className="text-white" />
          </button>

          {/* Slideshow Content */}
          <div className="relative z-10 h-full w-full mx-auto px-4 text-center">
            {/* Confetti Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    fontSize: `${20 + Math.random() * 20}px`,
                  }}
                >
                  🎉
                </div>
              ))}
            </div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    fontSize: `${20 + Math.random() * 20}px`,
                  }}
                >
                  🎁
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-screen text-center">
              <div className="animate-fade-in max-w-full">
                <h1 className="text-6xl md:text-7xl font-heading font-bold text-white mb-6 drop-shadow-2xl animate-bounce-slow">
                  🎂 Happy Birthday! 🎂
                </h1>

                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-4 border-celebration/50 shadow-2xl mb-8">
                  <img
                    src={currentSlidePerson.image}
                    alt={currentSlidePerson.alt}
                    className="w-48 h-48 md:w-96 md:h-96 rounded-full mx-auto mb-6 object-cover border-8 border-white shadow-2xl"
                  />

                  <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-3 drop-shadow-lg">
                    {currentSlidePerson.name}
                  </h2>

                  <p className="text-xl text-white/90 mb-2">{currentSlidePerson.department}</p>
                </div>

                <div className="mt-4 text-white/70">
                  {currentSlideIndex + 1} / {mockBirthdays.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {showSuccessMessage && (
          <div className="fixed top-20 right-4 z-50 bg-success text-success-foreground px-6 py-4 rounded-lg shadow-warm-lg flex items-center gap-3 animate-slide-in">
            <Icon name="CheckCircleIcon" size={24} />
            <span className="font-medium">Action completed successfully!</span>
          </div>
        )}

        {/* Header with Music Player and Slideshow Button */}
        <div className="mb-8 bg-card rounded-2xl shadow-warm-lg p-6 border border-border">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-celebration to-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="CakeIcon" size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  🎂 {currentMonthName} Birthdays
                </h1>
                <p className="text-muted-foreground">
                  {mockBirthdays.length} celebration
                  {mockBirthdays.length !== 1 ? 's' : ''} this month
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Start Slideshow Button */}
              {mockBirthdays.length > 0 && (
                <button
                  onClick={startSlideshow}
                  className="px-6 py-3 bg-gradient-to-r from-celebration to-primary text-white rounded-xl font-semibold hover:shadow-warm-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Icon name="PlayCircleIcon" size={24} />
                  Start Birthday Slideshow
                </button>
              )}

              {/* Music Player */}
              <div className="bg-gradient-to-r from-celebration/20 to-primary/20 rounded-xl p-4 border border-celebration/30 min-w-[280px]">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="MusicalNoteIcon" size={20} className="text-celebration" />
                  <span className="text-sm font-semibold text-foreground">Birthday Music</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {birthdaySongs[currentSongIndex].title}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSong}
                    className="p-2 rounded-lg bg-card hover:bg-muted transition-colors"
                    title="Previous song"
                  >
                    <Icon name="BackwardIcon" size={16} />
                  </button>
                  <button
                    onClick={toggleMusic}
                    className="flex-1 py-2 px-4 rounded-lg bg-celebration text-white hover:bg-celebration/90 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <Icon name={isPlaying ? 'PauseIcon' : 'PlayIcon'} size={20} />
                    {isPlaying ? 'Pause' : 'Play Music'}
                  </button>
                  <button
                    onClick={nextSong}
                    className="p-2 rounded-lg bg-card hover:bg-muted transition-colors"
                    title="Next song"
                  >
                    <Icon name="ForwardIcon" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Birthday People Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {mockBirthdays.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedPerson(person.id)}
              className={`cursor-pointer bg-card rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-warm-lg ${
                selectedPerson === person.id
                  ? 'border-celebration shadow-warm-lg scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={person.image}
                  alt={person.alt}
                  className="w-16 h-16 rounded-full object-cover border-2 border-celebration"
                />
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.department}</p>
                </div>

                <div className="animate-bounce">
                  <Icon name="CakeIcon" size={24} className="text-celebration" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    person.daysUntil === 0
                      ? 'bg-celebration text-white'
                      : person.daysUntil < 7
                        ? 'bg-warning/20 text-warning'
                        : 'bg-primary/10 text-primary'
                  }`}
                >
                  {getDaysUntilText(person.daysUntil)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(person.birthday).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {mockBirthdays.length === 0 && (
          <div className="text-center py-16 bg-card rounded-2xl shadow-warm border border-border">
            <Icon
              name="CalendarIcon"
              size={64}
              className="text-muted-foreground mx-auto mb-4 opacity-50"
            />
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
              No Birthdays This Month
            </h2>
            <p className="text-muted-foreground">
              Check back next month for upcoming celebrations!
            </p>
          </div>
        )}

        {/* Detailed View */}
        {selectedPersonData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              <BirthdayCard
                person={selectedPersonData}
                onUpdateStatus={handleUpdateStatus}
                onAddNote={handleAddNote}
              />
              <div className="bg-card rounded-xl shadow-warm p-6 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="ChartBarIcon" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      Monthly Stats
                    </h3>
                    <p className="text-sm text-muted-foreground">{currentMonthName}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-celebration/10 rounded-lg border border-celebration/20">
                    <div className="flex items-center gap-3">
                      <Icon name="CakeIcon" size={24} className="text-celebration" />
                      <span className="text-sm font-medium text-foreground">Total Birthdays</span>
                    </div>
                    <span className="text-2xl font-heading font-bold text-celebration">
                      {mockBirthdays.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Icon name="UserGroupIcon" size={24} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">Departments</span>
                    </div>
                    <span className="text-2xl font-heading font-bold text-primary">
                      {new Set(mockBirthdays.map((b) => b.department)).size}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <NotificationPanel birthdayCount={mockBirthdays.length} />
              <QuickActions onActionClick={handleQuickAction} />
            </div>
          </div>
        )}

        {/* Stats and Timeline */}
        {selectedPersonData && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 10s infinite linear;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ThisMonthBirthdaysInteractive;
