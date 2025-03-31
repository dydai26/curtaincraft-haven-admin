import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readOnly = false,
  size = 20
}) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={`${!readOnly ? 'cursor-pointer' : ''}`}
          onClick={() => !readOnly && onChange?.(star)}
          disabled={readOnly}
        >
          <Star
            size={size}
            className={`${
              star <= value
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-none text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}; 