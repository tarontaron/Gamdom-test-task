import { join } from 'path';
import { exit } from 'node:process';
import { hash } from 'bcrypt';

import type { IUser } from '../../src/models/user.model';
import type { IEvent } from '../../src/models/event.model';
import { readSeedFile } from '../helpers/readSeedFile';
import { client } from './client';

const seedDir = join(__dirname, '../seeds');

const isTableEmpty = async (tableName: string): Promise<boolean> => {
  const result = await client.query(`SELECT COUNT(*) FROM ${tableName};`);
  return result.rows[0].count === '0';
};

const main = async () => {
  try {
    await client.connect();

    // Check if users table is empty
    const isUsersEmpty = await isTableEmpty('users');
    const isEventsEmpty = await isTableEmpty('events');

    if (isUsersEmpty) {
      const usersData = await readSeedFile(join(seedDir, 'users.json')) as IUser[];

      if (usersData.length > 0) {
        for (const user of usersData) {
          user.password = await hash(user.password, process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 10);
        }

        const userValues = usersData
          .map((user, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`)
          .join(',');

        const flatUserValues = usersData.flatMap((user) => [
          user.name,
          user.email,
          user.password,
          user.role,
        ]);

        const userQuery = `
            INSERT INTO users (name, email, password, role)
            VALUES
            ${userValues};
        `;

        await client.query(userQuery, flatUserValues);
        console.log('Users inserted successfully.');
      }
    } else {
      console.log('Users table already has data. Skipping seeding.');
    }

    // Check if events table is empty
    if (isEventsEmpty) {
      const eventsData = await readSeedFile(join(seedDir, 'events.json')) as IEvent[];

      if (eventsData.length > 0) {
        const eventValues = eventsData
          .map((event, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
          .join(',');

        const flatEventValues = eventsData.flatMap((event) => [event.event_name, event.odds]);

        const eventQuery = `
            INSERT INTO events (event_name, odds)
            VALUES
            ${eventValues};
        `;

        await client.query(eventQuery, flatEventValues);
        console.log('Events inserted successfully.');
      }
    } else {
      console.log('Events table already has data. Skipping seeding.');
    }

    await client.end();
  } catch (e) {
    console.error('Error during seeding:', e);
    exit(1);
  }
};

main().then().catch();
