`sequelize init` 初始化数据库的配置文件
1. config 文件夹的 config.json，包含数据库的配置文件
2. migrations
3. models
4. seeders

docker run -v "$PWD/data":/var/lib/mysql -p 3306:3306 --name mysql-chat -e MYSQL_USER=root -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=chat -d mysql
创建 mysql 数据库镜像

## STEP1. sequelize model:generate --name User --attributes username:string,email:string
生成 User 初始化文件，自动生成 model 和 migration
(需手动修改自动生成的 model 和 migration 文件)

## STEP2. sequelize db:migrate
**Running Migration**
1. Will ensure a table called SequelizeMeta in database. This table is used to record which migrations have run on the current database
2. Start looking for any migration files which haven't run yet. This is possible by checking SequelizeMeta table. In this case it will run XXXXXXXXXXXXXX-create-user.js migration, which we created in last step.
3. Creates a table called Users with all columns as specified in its migration file

`sequelize db:migrate:undo`
Undoing Migrations (revert most recent migration)

`sequelize db:migrate:undo:all`
undoing all migrations

数据库操作
```bash
SELECT * FROM chat.users;
describe chat.users
```

How to kill port?
```bash
# find
sudo lsof -i :3000
# kill
kill -9 <PID>
```