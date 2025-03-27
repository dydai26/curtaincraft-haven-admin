
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react'; // Заміна іконки для перевірки

const AdminNavLink: React.FC = () => {
  const { isAdmin } = useAuth();

  console.log("Admin статус:", isAdmin); // Перевірка в консолі

  // Тимчасово прибираємо умову для перевірки, чи кнопка взагалі з'являється
  // if (!isAdmin) return null;

  return (
    <Button variant="outline" size="sm" asChild className="ml-2">
      <Link to="/admin">
        <Shield className="mr-2 h-4 w-4" /> {/* Іконка адмін-панелі */}
        Адмін панель
      </Link>
    </Button>
  );
};

export default AdminNavLink;
