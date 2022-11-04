module UrlFilter
  def prepend_project_path_if_relative(input, project)
    (input.include?"://" or input.start_with?"/") ? input : prepend_project_path(input, project)
  end
  def prepend_project_path(input, project)
    base = remove(project.url, "/index.html")
    "#{base}/#{input}"
  end
end

Liquid::Template.register_filter(UrlFilter)
