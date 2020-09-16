package company.newlife.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    private Integer id;
    private String code;
    private String name;
    private String description;
    private Set<Tag> tags;
}
