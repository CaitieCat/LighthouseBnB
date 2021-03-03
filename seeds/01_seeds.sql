INSERT INTO users (id, name, email, password)
VALUES (1, 'Johnny Perry', 'johnperry@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Shana Hunter', 'shanahunter@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Egbert Sutton', 'egbertsutton@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 3, 'Stall Beach', 'https://images.pexels.com/photos/1449767/pexels-photo-1449767.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-1449767.jpg&fm=jpg', 'https://images.pexels.com/photos/1449767/pexels-photo-1449767.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-1449767.jpg&fm=jpg', 100, 2, 3, 2, 'Canada', '4057 Tanner Street', 'Vancouver', 'British Columbia', 'V5R 2T4', true),
(2, 3, 'Goblin Forest', 'https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 120, 1, 2, 1, 'Canada', '1411 Scotts Lane', 'Vancouver', 'British Columbia', ' V0R 1J0', true),
(3, 2, 'Meadow Falls', 'https://images.pexels.com/photos/269138/pexels-photo-269138.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'https://images.pexels.com/photos/269138/pexels-photo-269138.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 90, 2, 4, 2, 'Canada', '2381 Burdett Avenue', 'Vancouver', 'British Columbia', 'V8Z 2J8', true);

INSERT INTO reservations(id, start_date, end_date, property_id, guest_id)
VALUES (1, '2021-01-08', '2021-01-11', 3, 3),
(2, '2021-01-24', '2021-01-29', 2, 2),
(3, '2021-02-17', '2021-02-25', 2, 1);

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 2, 2, 7, 'message'),
(2, 1, 2, 3, 9, 'message'),
(3, 3, 3, 1, 8, 'message');
