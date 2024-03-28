import { useState } from 'react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './calendar';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface DatePickerDemoProps {
 selected?: Date;
 onSelect: (date: Date) => void;
}

export function DatePickerDemo({ selected, onSelect }: DatePickerDemoProps) {
 const [date, setDate] = useState<Date | undefined>(selected);

 return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Selecione a data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date?: Date) => {
            if(date){
              setDate(date);
              onSelect(date);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
 );
}
