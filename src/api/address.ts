import express, { Request, Response } from 'express';
import { getConfig } from '../config/config';
import { validationResult, check } from 'express-validator';
import { generateSK } from '../utils/utils';
import { loggerFactory } from '../log/Logger';
import { watcherDatabase } from '../init';
import { ErgoUtils } from '../ergo/utils';
import { JsonBI } from '../ergo/network/parser';
import { ErgoNetwork } from '../ergo/network/ergoNetwork';

const logger = loggerFactory(import.meta.url);

const addressRouter = express.Router();

/**
 * Api for generating secret key
 */
addressRouter.get('/generate', async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).json(generateSK(getConfig().general.networkPrefix));
  } catch (e) {
    logger.warn(`An error occurred while generating secret key: ${e}`);
    res.status(500).send({ message: e.message });
  }
});

/**
 * Api for fetching assets
 */
addressRouter.get('/assets', async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let tokens = await ErgoUtils.getWatcherTokens();
    const { tokenName, sortByAmount } = req.query;
    if (tokenName) {
      tokens = tokens.filter((token) =>
        token.name?.toLowerCase()?.includes((tokenName as string).toLowerCase())
      );
    }
    if (sortByAmount) {
      if (sortByAmount === 'asc') {
        tokens = tokens.sort((a, b) => {
          if (a.amount < b.amount) {
            return -1;
          }
          if (a.amount > b.amount) {
            return 1;
          }
          return 0;
        });
      } else if (sortByAmount === 'desc') {
        tokens = tokens.sort((a, b) => {
          if (a.amount < b.amount) {
            return 1;
          }
          if (a.amount > b.amount) {
            return -1;
          }
          return 0;
        });
      }
    } else {
      tokens = tokens.sort((a, b) => a.tokenId.localeCompare(b.tokenId));
    }
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    tokens = tokens.slice(offset, offset + limit);

    res.status(200).send(JsonBI.stringify(tokens));
  } catch (e) {
    logger.warn(`An error occurred while fetching assets: ${e}`);
    res.status(500).send({ message: e.message });
  }
});

export default addressRouter;
