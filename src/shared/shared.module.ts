import { Module } from '@nestjs/common';
import { RefCheckService } from './validation/ref-check/ref-check.service';

@Module({
    providers: [RefCheckService],
    exports: [RefCheckService]
})
export class SharedModule {}
