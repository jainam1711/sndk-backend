/**
 * This is migrating DB
 * Used for new Database Or Update 
 */
import { sequelize, createOrAlterDb } from './sequilize';
import { logger } from '../logger';

(async function migration() {
    try {
        logger.info('------------------------Migration started---------------------');
        await createOrAlterDb();
        await sequelize.close();
        logger.info('------------------------Migration ended---------------------');
    } catch (error) {
        logger.error('---------------------------Error:');
        logger.error(error);
    }
})();
