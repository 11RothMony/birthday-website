"use client";

import React, { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface BirthdayPerson {
  id: number;
  name: string;
  department: string;
  position: string;
  birthday: string;
  age: number;
  image: string;
  alt: string;
  preferences: {
    cakeType: string;
    dietaryRestrictions: string[];
    celebrationStyle: string;
  };
  notes: string;
}

interface BirthdayCardProps {
  person: BirthdayPerson;
  onUpdateStatus: (id: number, status: string) => void;
  onAddNote: (id: number, note: string) => void;
}

const BirthdayCard = ({ person, onUpdateStatus, onAddNote }: BirthdayCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  // Calculate age from year of birth
  const calculateAge = (yearOfBirth: number): number => {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth;
  };

  const age = calculateAge(person.age);

  const handleAddNote = () => {
    if (noteText.trim()) {
      onAddNote(person.id, noteText);
      setNoteText("");
      setShowNoteInput(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-warm hover:shadow-warm-lg transition-all duration-300 overflow-hidden border border-border">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20">
              <AppImage
                src={person.image}
                alt={person.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-celebration rounded-full flex items-center justify-center shadow-warm">
              <Icon name="CakeIcon" size={16} className="text-celebration-foreground" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                  {person.name}
                </h3>
                <p className="text-sm text-muted-foreground"> Department: {person.department}</p>
                <p className="text-sm text-muted-foreground"> Position: {person.position}</p>
                <p className="text-sm text-muted-foreground"> Date of birth: {person.birthday}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <Icon name="SparklesIcon" size={16} className="text-primary" />
                <span className="text-sm font-semibold text-primary">{age} years</span>
              </div>
            </div>

            {/* <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg">
                <Icon name="CakeIcon" size={14} className="text-muted-foreground" />
                <span className="text-xs text-foreground">{person.preferences.cakeType}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 rounded-lg">
                <Icon name="UserGroupIcon" size={14} className="text-secondary" />
                <span className="text-xs text-secondary">
                  {person.preferences.celebrationStyle}
                </span>
              </div>
            </div> */}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default BirthdayCard;
