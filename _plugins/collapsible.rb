module Jekyll
  class CreateCollapsibleTagBlock < Liquid::Block

    # Usage:
    #   {% collapsible TITLE OF THE COLLAPSIBLE [--expanded] [--id=CUSTOM_ID] %}
    # Note that if the very first content in the page is a collapsible (or any liquid block), you might get an error about "Liquid block containing the excerpt separator "\n\n"".
    # This is for a feature I'm not currently using (exceprts), but to silence the warning, either:
    #   1. Remove the blank lines (replace with <br /> or something)
    #   2. Add this to the front-matter: "excerpt_separator: <!-- excerpt-end -->"
    def initialize(tag_name, markup, tokens)
      super
      args = markup.split(/\s+/)

      # The title is everything up to the first flag (starts with --)
      @title = args.take_while { |arg| !arg.start_with?("--") }.join(' ')

      # Default values
      @default_checked = false
      @id = nil
    
      # Parsing flags
      args.drop_while { |arg| !arg.start_with?("--") }.each do |flag|
        case flag
        when '--expanded'
          @default_checked = true
        when /--id=(.+)/
          @id = $1
        end
      end
    
      # Generate ID from title if not provided
      @id ||= @title.strip.downcase.gsub(' ', '-')
    end

    def render(context)
      text = super
      checked_attr = @default_checked ? 'checked' : ''

      %{
<a id="#{@id}" />
<div class="wrap-collapsible">
  <input id="collapsible-#{@id}" class="toggle" type="checkbox" #{checked_attr}>
  <label for="collapsible-#{@id}" class="lbl-toggle">#{@title}</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

#{text}

</div>
  </div>
</div>
      }
    end

  end
end

Liquid::Template.register_tag('collapsible', Jekyll::CreateCollapsibleTagBlock)
