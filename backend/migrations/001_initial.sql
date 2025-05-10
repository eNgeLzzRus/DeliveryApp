CREATE TABLE IF NOT EXISTS аккаунт (
  id_аккаунта INTEGER PRIMARY KEY AUTOINCREMENT,
  логин TEXT NOT NULL UNIQUE,
  пароль TEXT NOT NULL
);

-- 2. КЛИЕНТ
CREATE TABLE IF NOT EXISTS клиент (
  id_клиента INTEGER PRIMARY KEY AUTOINCREMENT,
  адрес TEXT NOT NULL,
  id_аккаунта INTEGER NOT NULL,
  FOREIGN KEY (id_аккаунта) REFERENCES аккаунт(id_аккаунта)
);

-- 3. КУРЬЕР
CREATE TABLE IF NOT EXISTS курьер (
  id_курьера INTEGER PRIMARY KEY AUTOINCREMENT,
  имя TEXT NOT NULL,
  контакт INTEGER,
  id_аккаунта INTEGER NOT NULL,
  FOREIGN KEY (id_аккаунта) REFERENCES аккаунт(id_аккаунта)
);

-- 4. СТАТУС (статусы заказов)
CREATE TABLE IF NOT EXISTS статус (
  id_статуса INTEGER PRIMARY KEY AUTOINCREMENT,
  название TEXT NOT NULL
);

-- 5. ТИП_ПРОДУКТА (категории)
CREATE TABLE IF NOT EXISTS тип_продукта (
  id_типа INTEGER PRIMARY KEY AUTOINCREMENT,
  название TEXT NOT NULL,
  способ_приготовления TEXT,
  особенности TEXT
);

-- 6. ИНГРИДИЕНТ
CREATE TABLE IF NOT EXISTS ингридиент (
  id_ингридиента INTEGER PRIMARY KEY AUTOINCREMENT,
  название TEXT NOT NULL
);

-- 7. ПРОДУКТ
CREATE TABLE IF NOT EXISTS продукт (
  id_продукта INTEGER PRIMARY KEY AUTOINCREMENT,
  название TEXT NOT NULL,
  стоимость REAL NOT NULL,
  вес REAL,
  время_готовки TEXT,
  id_типа INTEGER NOT NULL,
  FOREIGN KEY (id_типа) REFERENCES тип_продукта(id_типа)
);

-- 8. ПРОДУКТ_ИНГРИДИЕНТ (связь многие-ко-многим)
CREATE TABLE IF NOT EXISTS продукт_ингридиент (
  id_ингридиента INTEGER NOT NULL,
  id_продукта INTEGER NOT NULL,
  количество TEXT NOT NULL,
  PRIMARY KEY (id_ингридиента, id_продукта),
  FOREIGN KEY (id_ингридиента) REFERENCES ингридиент(id_ингридиента),
  FOREIGN KEY (id_продукта) REFERENCES продукт(id_продукта)
);

-- 9. ЗАКАЗ
CREATE TABLE IF NOT EXISTS заказ (
  id_заказа INTEGER PRIMARY KEY AUTOINCREMENT,
  стоимость REAL NOT NULL,
  id_клиента INTEGER NOT NULL,
  id_курьера INTEGER NOT NULL,
  id_статуса INTEGER NOT NULL,
  FOREIGN KEY (id_клиента) REFERENCES клиент(id_клиента),
  FOREIGN KEY (id_курьера) REFERENCES курьер(id_курьера),
  FOREIGN KEY (id_статуса) REFERENCES статус(id_статуса)
);

-- 10. Таблица баннеров (для главной страницы)
CREATE TABLE IF NOT EXISTS баннеры (
  id_баннера INTEGER PRIMARY KEY AUTOINCREMENT,
  image_path TEXT NOT NULL,
  ссылка TEXT,
  is_active BOOLEAN DEFAULT true
);