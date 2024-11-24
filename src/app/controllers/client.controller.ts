import { AppDataSource } from '../../database/data-source';
import { Request, Response, NextFunction } from 'express';
import { Client } from '../entities/Client';

export class ClientController {
    
    public static async listClients(req: Request, res: Response, next: NextFunction) {
        const { cpforcnpj } = req.query;

        const clientRepository = AppDataSource.getRepository(Client);

        try {
            let clients;

            if (cpforcnpj) {
                clients = await clientRepository.find({
                    where: { cpforcnpj: cpforcnpj as string },
                });
            } else {
                clients = await clientRepository.find();
            }

            res.status(200).json(clients);
        } catch (error) {
            console.error('Error listing clients:', error);
            res.status(500).json({ error: 'Failed to list clients' });
        }
    }

    public static async createClient(req: Request, res: Response, next: NextFunction) {
        const { name, email, cpforcnpj, tel, address, number, cep, district, city, uf } = req.body;

        const clientRepository = AppDataSource.getRepository(Client);

        try {
            const existingClient = await clientRepository.findOneBy({ cpforcnpj });
            if (existingClient) {
                return res.status(400).json({ error: 'A client with this CPF or CNPJ already exists' });
            }

            const client = new Client();
            client.name = name;
            client.email = email;
            client.cpforcnpj = cpforcnpj;
            client.tel = tel;
            client.address = address;
            client.number = number;
            client.cep = cep;
            client.district = district;
            client.city = city;
            client.uf = uf;

            await clientRepository.save(client);

            res.status(201).json({ message: 'Client created successfully', client });
        } catch (error) {
            console.error('Error creating client:', error);
            res.status(500).json({ error: 'Failed to create client' });
        }
    }

    public static async deleteClient(req: Request, res: Response, next: NextFunction) {
        const { cpforcnpj } = req.params;

        const clientRepository = AppDataSource.getRepository(Client);

        try {
            const client = await clientRepository.findOneBy({ cpforcnpj });

            if (!client) {
                return res.status(404).json({ error: 'Client not found' });
            }

            await clientRepository.remove(client);

            res.status(200).json({ message: 'Client deleted successfully' });
        } catch (error) {
            console.error('Error deleting client:', error);
            res.status(500).json({ error: 'Failed to delete client' });
        }
    }
}
