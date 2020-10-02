package company.newlife.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class Category {
    private Integer id;
    private String code;
    private String name;
    private Set<Post> posts;
    private Set<Tag> tags;
}
