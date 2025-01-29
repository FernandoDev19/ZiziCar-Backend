import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class MetaService {
  private url: string;
  private accessToken: string;

  constructor(private configService: ConfigService) {
    this.url = this.configService.get('URL_META_WSP');
    this.accessToken = this.configService.get<string>('META_ACCESS_TOKEN');
  }

  async sendWhatsAppMessage(
    phone: string,
    message: string,
    type: 'text' | 'image' | 'video' | 'audio' | 'document',
    mediaId?: string,
  ): Promise<AxiosResponse> {
    const url = this.url;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    let messageData = {};

    if (type === 'text') {
      messageData = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone,
        type: type,
        text: {
          preview_url: false,
          body: message,
        },
      };
    } else if (type === 'image') {
      messageData = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone,
        type: type,
        image: {
          id: mediaId,
          caption: message || '',
        },
      };
    } else if (type === 'video') {
      messageData = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone,
        type: type,
        video: {
          id: mediaId,
          caption: message || '',
        },
      };
    } else if (type === 'audio') {
      messageData = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone,
        type: type,
        audio: {
          id: mediaId,
        },
      };
    } else if (type === 'document') {
      messageData = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone,
        type: type,
        document: {
          id: mediaId,
          caption: message || '',
        },
      };
    }

    const response = await axios.post(url, messageData, { headers });
    return response.data;
  }

  async sendRequestConfirmationTemplate(
    phone: string,
    customerName: string,
  ) {
    const url = this.url;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    const messageData = {
      messaging_product: 'whatsapp',
      to: phone,
      type: 'template',
      template: {
        name: 'welcome',
        language: {
          code: 'es',
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: {
                  link: 'https://imagenes-publicas-zzcr-s3.s3.amazonaws.com/zizicar-header.jpg',
                },
              },
            ],
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: customerName,
              },
            ],
          },
        ],
      },
    };

    const response = await axios.post(url, messageData, { headers });
    return response.data;
  }
}
