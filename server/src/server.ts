import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import { convertHourtStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutestStringToHourString } from './utils/convert-minutes-string-to-hour';

const app = express()

app.use(express.json())
app.use(cors())
//origin:

const prisma = new PrismaClient();

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })

  return res.json(games)
})

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  // validacao -> zod javascript

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourtStringToMinutes(body.hourStart),
      hourEnd: convertHourtStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
  }})


  return res.status(201).json(ad)
})

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutestStringToHourString(ad.hourStart),
      hourEnd: convertMinutestStringToHourString(ad.hourEnd),
    }
  }))
})

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return res.json({
    discord: ad.discord,
  })
})

app.listen(3333)