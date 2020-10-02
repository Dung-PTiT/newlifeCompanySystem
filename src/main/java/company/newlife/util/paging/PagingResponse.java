package company.newlife.util.paging;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagingResponse<T> {
    private int draw;
    private int totalDraw;
    private int recordsTotal;
    private int recordsFiltered;
    private List<T> data;
}
