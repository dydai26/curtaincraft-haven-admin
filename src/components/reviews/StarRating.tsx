// src/components/reviews/StarRating.tsx

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  editable: boolean;
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, editable, onChange }) => {
  const handleClick = (value: number) => {
    if (editable) {
      onChange(value);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
