import { ClientController } from '../controllers/client.controller';
import { Router } from 'express';

const clientRoutes = Router();

clientRoutes.post('', ClientController.createClient);
clientRoutes.get('', ClientController.listClients);
clientRoutes.delete('/:id', ClientController.deleteClient);

export default clientRoutes;
