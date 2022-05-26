import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@WebSocketGateway(8181, { namespace: 'cats' })
export class CatsGateway {
  constructor(private readonly catsService: CatsService) {}

  @SubscribeMessage('createCat')
  create(@MessageBody() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @SubscribeMessage('findAllCats')
  findAll() {
    return this.catsService.findAll();
  }

  @SubscribeMessage('findOneCat')
  findOne(@MessageBody() id: number) {
    return this.catsService.findOne(id);
  }

  @SubscribeMessage('updateCat')
  update(@MessageBody() updateCatDto: UpdateCatDto) {
    return this.catsService.update(updateCatDto.id, updateCatDto);
  }

  @SubscribeMessage('removeCat')
  remove(@MessageBody() id: number) {
    return this.catsService.remove(id);
  }
}
