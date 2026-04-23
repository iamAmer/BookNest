-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Fiction', 'Fiction and novels - stories from imagination'),
('History', 'Historical books and accounts of past events'),
('Science', 'Science and nature - explore the world'),
('Kids', 'Children''s books - age-appropriate stories'),
('Biography', 'Biographical works - life stories'),
('Technology', 'Technology and computing - modern innovations')
ON CONFLICT DO NOTHING;

-- Insert sample books
INSERT INTO books (title, author, category, difficulty, description, total_pages, rating) VALUES
('The Little Prince', 'Antoine de Saint-Exupéry', 'Kids', 'A1', 'A classic children''s book about a young prince', 96, 4.8),
('Charlotte''s Web', 'E.B. White', 'Kids', 'A2', 'A story of friendship between a pig and a spider', 184, 4.7),
('The Very Hungry Caterpillar', 'Eric Carle', 'Kids', 'A1', 'A picture book about transformation', 26, 4.9),
('Pride and Prejudice', 'Jane Austen', 'Fiction', 'B2', 'A romantic novel set in Georgian England', 279, 4.7),
('Sense and Sensibility', 'Jane Austen', 'Fiction', 'B1', 'A tale of two sisters and their romantic journeys', 325, 4.6),
('A Brief History of Time', 'Stephen Hawking', 'Science', 'C1', 'Exploring cosmology and physics from big bang to black holes', 256, 4.6),
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'B1', 'The American dream in the Jazz Age', 180, 4.5),
('1984', 'George Orwell', 'Fiction', 'B2', 'A dystopian novel about totalitarianism', 328, 4.7),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'B2', 'A story about racial injustice and growing up', 324, 4.8),
('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 'B1', 'A teenage protagonist''s journey through New York', 277, 4.4),
('A Tale of Two Cities', 'Charles Dickens', 'History', 'B2', 'Love and sacrifice during the French Revolution', 489, 4.5),
('The History of the Decline and Fall', 'Edward Gibbon', 'History', 'C2', 'Comprehensive history of the Roman Empire', 1000, 4.3),
('Thinking, Fast and Slow', 'Daniel Kahneman', 'Science', 'B2', 'Understanding how we think and make decisions', 499, 4.5),
('Sapiens', 'Yuval Noah Harari', 'History', 'B2', 'A brief history of humankind', 443, 4.7),
('The Code Breaker', 'Walter Isaacson', 'Biography', 'B1', 'The life of Jennifer Doudna and CRISPR', 528, 4.6)
ON CONFLICT DO NOTHING;

-- Insert sample achievements
INSERT INTO achievements (name, description, badge_color, criteria_json) VALUES
('First Steps', 'Complete your first book', '#FFD700', '{"type":"book_completed","count":1}'),
('Bookworm', 'Complete 5 books', '#C0C0C0', '{"type":"book_completed","count":5}'),
('Book Collector', 'Complete 10 books', '#CD7F32', '{"type":"book_completed","count":10}'),
('Vocabulary Apprentice', 'Learn 10 words', '#87CEEB', '{"type":"vocabulary_count","count":10}'),
('Vocabulary Master', 'Learn 50 words', '#4169E1', '{"type":"vocabulary_count","count":50}'),
('Quiz Champion', 'Score 100% on a quiz', '#FF6347', '{"type":"quiz_score","score":100}'),
('Consistent Reader', 'Read for 7 consecutive days', '#32CD32', '{"type":"reading_streak","days":7}'),
('Week Warrior', 'Read for 14 consecutive days', '#228B22', '{"type":"reading_streak","days":14}'),
('Speed Reader', 'Complete a book in one day', '#FF1493', '{"type":"book_completed_one_day","count":1}'),
('Early Bird', 'Complete a reading session before 8 AM', '#FFD700', '{"type":"early_read","count":1}');

-- Insert admin user (password: admin123 - bcrypt hash)
-- Note: Replace this with actual bcrypt hash of your chosen password
INSERT INTO auth_users (email, password_hash, full_name, is_admin) VALUES
('admin@booknest.com', '$2a$10$YourBcryptHashHere', 'Admin User', TRUE)
ON CONFLICT DO NOTHING;

-- Insert demo user (password: demo123)
-- Note: Replace this with actual bcrypt hash
INSERT INTO auth_users (email, password_hash, full_name) VALUES
('demo@booknest.com', '$2a$10$YourBcryptHashHere', 'Demo User')
ON CONFLICT DO NOTHING;
